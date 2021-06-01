
const axios = require('axios');
const dayjs = require('dayjs');

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

const loadStats = async (player, team, injury) => 
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
      assists: 0,
      shots: 0,
      games: 0,
      penaltyMinutes: 0,
      timeOnIce: "00:00",
      shifts: 0
    }
  }

  const strapiStats = player.stats.find(
    ({ year }) => year == STATS_YEAR);
  
  // existing strapi stats found - update
  if (strapiStats)
  {
    //console.log(`Updating Existing Stats for ${player.name}...`);
    await strapi.query('stat').update({ id: strapiStats.id }, {
      points: stats.points,
      goals: stats.goals,
      assists: stats.assists,
      shots: stats.shots,
      games: stats.games,
      penaltyMinutes: stats.pim,
      timeOnIce: stats.timeOnIce,
      shifts: stats.shifts,
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
      points: stats.points,
      goals: stats.goals,
      assists: stats.assists,
      shots: stats.shots,
      games: stats.games,
      penaltyMinutes: stats.pim,
      timeOnIce: stats.timeOnIce,
      shifts: stats.shifts,
      player: player.id,
      active: team.active
    });
  }

  let strapiInjury;
  if (strapiStats.injury)
  {
    if (injury)
    {
      await strapi.query('injury').update({ id: strapiStats.injury }, injury);
    }
    else
    {
      await strapi.query('injury').delete({ id: strapiStats.injury });
    }
  }
  else if (injury)
  {
    strapiInjury = await strapi.query('injury').create({
      ...injury,
      stat: strapiStats.id
    });
  }

  //console.log('Loaded NHL Playoff Stats!');
}

const loadPlayer = async (player, team, injury) => 
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
    primaryPosition: {
      code: positionCode
    }
  } = playerData.people[0];

  // skip goalies!
  if (positionCode === 'G')
  {
    return;
  }

  let strapiPlayer = await strapi.query('player').
    findOne({ apiId: id });

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

  await loadStats(strapiPlayer, team, injury);
}

const loadTeam = async (team) => 
{
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
      gameToday: team.gameToday,
      nbcApiId: team.nbcApiId,
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
      nbcApiId: team.nbcApiId,
      gameToday: team.gameToday,
    });
  }

  const { data: teamRoster } = await axios.get(
    `${NHL_API_BASE_URL}/teams/${teamId}/roster`
  );

  // TODO: find player by name, jersey #, position -> update injury status
  const { 
    data: { 
      data: rosterInjuries,
      included: rosterInjuriesRelationships
    } 
  } = await axios.get(
    `${NBC_API_BASE_URL}/injury?sort=-start_date&filter%5Bplayer.team.id%5D=${team.nbcApiId}&filter%5Bplayer.status.active%5D=1&filter%5Bactive%5D=1&include=player,injury_type,player.status`
  );

  let rosterInjuryTypes = {};
  let rosterPlayerInfo = {};
  let rosterPlayerStatus = {};

  for (let i = rosterInjuriesRelationships.length - 1; i >= 0; i--)
  {
    const rosterInjuriesRelationship = rosterInjuriesRelationships[i];
    const { type, id, attributes, relationships } = rosterInjuriesRelationship;

    if (type === 'player--hockey')
    {
      rosterPlayerInfo[id] = attributes;
      rosterPlayerInfo[id].status = rosterPlayerStatus[relationships.status.data.id];
    }
    if (type === 'player_status')
    {
      rosterPlayerStatus[id] = attributes;
    }
    if (type === 'injury_type')
    {
      rosterInjuryTypes[id] = attributes;
    }
  }
  
  let playerInjuries = {};
  for (const rosterInjury of rosterInjuries)
  {
    const injuryDetails = rosterInjury.attributes;
    const injuryType = rosterInjuryTypes[rosterInjury.relationships.injury_type.data.id];
    const player = rosterPlayerInfo[rosterInjury.relationships.player.data.id];
    
    playerInjuries[`${player.name} (${parseInt(player.jersey)})`] = {
      returns: injuryDetails.return_estimate,
      type: injuryType.name,
      status: player.status.name,
      startDate: injuryDetails.start_date
    }
  }

  const playerPromises = [];
  for (const player of teamRoster.roster)
  {
    const team = {
      ...strapiTeam,
      active,
    };
    const injury = playerInjuries[`${player.person.fullName} (${player.jerseyNumber})`];
    playerPromises.push(loadPlayer(
      player, 
      team,
      injury
    ));
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
  let teamsLoaded = [];
  
  for (let i = playoffsData.rounds.length - 1; i >= 0; i--)
  {
    const round = playoffsData.rounds[i];

    for (const series of round.series)
    {
      if (series.matchupTeams === undefined)
      {
        continue;
      }
      const nextGame = series.currentGame.seriesSummary.gameTime;
      const gameToday = dayjs().subtract(8, 'hours').isSame(dayjs(nextGame), 'day');

      for (const team of series.matchupTeams)
      {
        if (teamsLoaded.includes(team.team.name))
        {
          continue;
        }

        const teamName = team.team.name;
        const nbcApiTeamId = nbcTeamData.find(({ attributes }) => (
          attributes.name === teamName.replace('.', '').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        )).id;
        teamPromises.push(loadTeam({
          ...team, 
          nbcApiId: nbcApiTeamId,
          gameToday
          //currentGame: 
        }));
        teamsLoaded.push(team.team.name);
      }
    }
  }

  await Promise.all(teamPromises);

  console.log('Loaded NHL Players & Teams!');
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