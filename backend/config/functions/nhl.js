
const axios = require('axios');

const NHL_API_BASE_URL = 'https://statsapi.web.nhl.com/api/v1';

const NBC_API_BASE_URL = 'https://www.nbcsportsedge.com/edge/api';
const NBC_API_CONSTANTS = {
  NHL_LEAGUE_ID: '14dd5dc9-65ef-4744-b48b-683511cf5302'
};

const STATS_YEAR = '20202021';

const loadAllData = async () => {
  // await strapi.query('stat').delete();
  // await strapi.query('player').delete();
  // await strapi.query('team').delete();

  await loadRosters();
  await updatePoolStandings();
}

const loadPlayer = async (player, team) => 
{
  const { data: playerData } = await axios.get(
    `${NHL_API_BASE_URL}/people/${player.person.id}`
  );

  const {
    id,
    fullName,
    firstName,
    lastName,
    primaryNumber,
    rosterStatus,
    primaryPosition: {
      code: positionCode
    }
  } = playerData.people[0];

  // skip goalies!
  if (positionCode === 'G')
  {
    return;
  }

  let [strapiPlayer] = await strapi.query('player').
    find({ apiId: id });

  // Player is not in database
  if (strapiPlayer === undefined)
  {
    try {
      strapiPlayer = await strapi.query('player').create({
        apiId: id,
        name: `${fullName} (${team.abbreviation})`,
        firstName,
        lastName,
        position: positionCode,
        jerseyNumber: Number.isInteger(primaryNumber) ? parseInt(primaryNumber) : null,
        team: team.id
      })
    }
    catch (err)
    {
      console.log({
        apiId: id,
        name: `${fullName} (${team.abbreviation})`,
        firstName,
        lastName,
        position: positionCode,
        jerseyNumber: Number.isInteger(primaryNumber) ? parseInt(primaryNumber) : null,
        team: team.id
      })
      console.log(err);
    }
  }
  else
  {
    strapiPlayer = await strapi.query('player').update({ id: strapiPlayer.id }, {
      apiId: id,
      name: `${fullName} (${team.abbreviation})`,
      firstName,
      lastName,
      position: positionCode,
      jerseyNumber: Number.isInteger(primaryNumber) ? parseInt(primaryNumber) : null,
      team: team.id
    })
  }

  await loadStats(strapiPlayer, team);
}

const loadTeam = async (team, nbcApiTeamId) => {
  console.log(`Loading Team: ${team.team.name}`);
  const teamId = team.team.id;
  const active = team.seriesRecord.losses < 4;
  
  const strapiTeamQuery = await strapi.query('team').
    find({ apiId: teamId });

  let strapiTeam;
  if (strapiTeamQuery.length === 0)
  {
    const { data: teamData } = await axios.get(
      `${NHL_API_BASE_URL}/teams/${teamId}`
    );

    const {
      name,
      abbreviation,
      teamName,
      locationName,
      division: {
        name: division
      },
      conference: {
        name: conference
      }
    } = teamData.teams[0];

    strapiTeam = await strapi.query('team').create({
      apiId: teamId,
      nbcApiId: nbcApiTeamId,
      name,
      abbreviation,
      teamName,
      locationName,
      conference,
      division
    });
  }
  else
  {
    strapiTeam = strapiTeamQuery[0];
    await strapi.query('team').update({ id: strapiTeam.id }, {
      nbcApiId: nbcApiTeamId,
    });
  }

  const { data: teamRoster } = await axios.get(
    `${NHL_API_BASE_URL}/teams/${teamId}/roster`
  );

  // TODO: find player by name, jersey #, position -> update injury status
  const { data: { data: rosterInjuries } } = await axios.get(
    `${NBC_API_BASE_URL}/injury?sort=-start_date&filter%5Bplayer.team.id%5D=${nbcApiTeamId}&filter%5Bplayer.status.active%5D=1&filter%5Bactive%5D=1&include=injury_type,player,player.status,player.position`
  )

  const playerPromises = [];
  for (const player of teamRoster.roster)
  {
    playerPromises.push(loadPlayer(player, {
      ...strapiTeam, 
      active
    }));
  }
  await Promise.all(playerPromises);

  console.log(`Team Loaded: ${team.team.name}`);
}

const loadRosters = async () => {
  console.log('Loading NHL Players & Teams...');

  const { data: playoffsData } = await axios.get(
    `${NHL_API_BASE_URL}/tournaments/playoffs?expand=round.series`
  );

  const { data: { data: nbcTeamData } } = await axios.get(
    `${NBC_API_BASE_URL}/team/hockey?sort=locale&filter%5Bactive%5D=1&filter%5Bleague.id%5D=${NBC_API_CONSTANTS.NHL_LEAGUE_ID}`
  );

  let teamPromises = [];
  for (const series of playoffsData.rounds[0].series)
  {
    for (const team of series.matchupTeams)
    {
      const teamName = team.team.name;
      const nbcApiTeamId = nbcTeamData.find(({ attributes }) => (
        attributes.name === teamName.replace('.', '').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      )).id;
      teamPromises.push(loadTeam(team, nbcApiTeamId));
    }
  }

  await Promise.all(teamPromises);

  console.log('Loaded NHL Players & Teams!');
}

const loadStats = async (player, team) => 
{
  const { 
    data: { 
      stats: [{
        splits
      }]
    }
  } = await axios.get(
    `https://statsapi.web.nhl.com/api/v1/people/${player.apiId}/stats?stats=statsSingleSeasonPlayoffs&season=${STATS_YEAR}`
  )
  
  let stats;
  if (splits.length > 0)
  {
    stats = splits[0].stat;
  }
  else
  {
    stats = {
      points: 0,
      goals: 0,
      assists: 0
    }
  }

  const strapiStatsQuery = player.stats.find(
    ({ year }) => year == STATS_YEAR);
  
  // existing strapi stats found - update
  if (strapiStatsQuery)
  {
    //console.log(`Updating Existing Stats for ${player.name}...`);
    await strapi.query('stat').update({ id: strapiStatsQuery.id }, {
      points: stats.points,
      goals: stats.goals,
      assists: stats.assists,
      active: team.active
    });
  }
  // create new stats
  else
  {
    //console.log(`Creating New Stats for ${player.name}...`);
    await strapi.query('stat').create({
      year: STATS_YEAR,
      type: 'playoffs',
      points: Number.isInteger(stats.points) ? parseInt(stats.points) : null,
      goals: Number.isInteger(stats.goals) ? parseInt(stats.goals) : null,
      assists: Number.isInteger(stats.assists) ? parseInt(stats.assists) : null,
      player: player.id,
      active: team.active
    });
  }

  //console.log('Loaded NHL Playoff Stats!');
}

const updatePoolStandings = async () => 
{
  console.log('Updating ALL pool lineup total points...');
  const strapiLineups = await strapi.query('lineup').find({}, ['pool', 'players', 'players.stats']);
  
  let lineupPromises = [];
  for (const lineup of strapiLineups)
  {
    // gets stats of all players in lineup
    // finds the stats for the pool year
    const lineupTotalPoints = lineup.players.reduce((totalPoints, {stats}) => 
    {
      const relativeStats = stats.find(({ year }) => year === lineup.pool.year);
      if (relativeStats) {
        totalPoints += relativeStats.points;
      }

      return totalPoints;
    }, 0);

    lineupPromises.push(
      await strapi.query('lineup').update({ id: lineup.id }, {
        points: lineupTotalPoints
      })
    );
  }

  await Promise.all(lineupPromises);
  console.log('Updated ALL pool lineup total points!');
}

module.exports = {
  loadAllData
}