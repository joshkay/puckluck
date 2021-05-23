
const axios = require('axios');

const BASE_URL = 'https://statsapi.web.nhl.com/api/v1';
const STATS_YEAR = '20202021';

const loadAllData = async () => {

  await strapi.query('stat').delete();
  await strapi.query('player').delete();
  await strapi.query('team').delete();

  await loadRosters();
  await updatePoolStandings();
}

const loadPlayer = async (player, strapiTeam) => 
{
  const { data: playerData } = await axios.get(
    `${BASE_URL}/people/${player.person.id}`
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

  let [strapiPlayer] = await strapi.query('player').
    find({ apiId: id });

  // Player is not in database
  if (strapiPlayer === undefined)
  {
    try {
      strapiPlayer = await strapi.query('player').create({
        apiId: id,
        name: `${fullName} (${strapiTeam.abbreviation})`,
        firstName,
        lastName,
        position: positionCode,
        jerseyNumber: Number.isInteger(primaryNumber) ? parseInt(primaryNumber) : undefined,
        team: strapiTeam.id
      })
    }
    catch (err)
    {
      console.log({
        apiId: id,
        name: `${fullName} (${strapiTeam.abbreviation})`,
        firstName,
        lastName,
        position: positionCode,
        jerseyNumber: Number.isInteger(primaryNumber) ? parseInt(primaryNumber) : undefined,
        team: strapiTeam.id
      })
      console.log(err);
    }
  }
  else
  {
    strapiPlayer = await strapi.query('player').update({ id: strapiPlayer.id }, {
      apiId: id,
      name: `${fullName} (${strapiTeam.abbreviation})`,
      firstName,
      lastName,
      position: positionCode,
      jerseyNumber: Number.isInteger(primaryNumber) ? parseInt(primaryNumber) : undefined,
      team: strapiTeam.id
    })
  }

  await loadStats(strapiPlayer);
}

const loadTeam = async (team) => {
  console.log(`Loading Team: ${team.team.name}`);
  const teamId = team.team.id;
  
  const strapiTeamQuery = await strapi.query('team').
    find({ apiId: teamId });

  let strapiTeam;
  if (strapiTeamQuery.length === 0)
  {
    const { data: teamData } = await axios.get(
      `${BASE_URL}/teams/${teamId}`
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
  }

  const { data: teamRoster } = await axios.get(
    `${BASE_URL}/teams/${teamId}/roster`
  );

  const playerPromises = [];
  for (const player of teamRoster.roster)
  {
    playerPromises.push(loadPlayer(player, strapiTeam));
  }
  await Promise.all(playerPromises);

  console.log(`Team Loaded: ${team.team.name}`);
}

const loadRosters = async () => {
  console.log('Loading NHL Players & Teams...');

  const { data: playoffsData } = await axios.get(
    `${BASE_URL}/tournaments/playoffs?expand=round.series`
  );

  let teamPromises = [];
  for (const series of playoffsData.rounds[0].series)
  {
    for (const team of series.matchupTeams)
    {
      teamPromises.push(loadTeam(team));
    }
  }

  await Promise.all(teamPromises);

  console.log('Loaded NHL Players & Teams!');
}

const loadStats = async (strapiPlayer) => 
{
  const { 
    data: { 
      stats: [{
        splits
      }]
    }
  } = await axios.get(
    `https://statsapi.web.nhl.com/api/v1/people/${strapiPlayer.apiId}/stats?stats=statsSingleSeasonPlayoffs&season=${STATS_YEAR}`
  )
  
  if (splits.length > 0)
  {
    const stats = splits[0].stat;
    const strapiStatsQuery = strapiPlayer.stats.find(
      ({ year }) => year == STATS_YEAR);
  
    // existing strapi stats found - update
    if (strapiStatsQuery)
    {
      //console.log(`Updating Existing Stats for ${strapiPlayer.name}...`);
      await strapi.query('stat').update({ id: strapiStatsQuery.id }, {
        points: stats.points,
        goals: stats.goals,
        assists: stats.assists,
      });
    }
    // create new stats
    else
    {
      //console.log(`Creating New Stats for ${strapiPlayer.name}...`);
      await strapi.query('stat').create({
        year: STATS_YEAR,
        type: 'playoffs',
        points: stats.points,
        goals: stats.goals,
        assists: stats.assists,
        player: strapiPlayer.id
      });
    }
  }
  
  //console.log('Loaded NHL Playoff Stats!');
}

const loadStatsOld = async () => 
{
  console.log('Loading NHL Playoff Stats...');
  const { data } = await axios.get(
    `https://api.nhle.com/stats/rest/en/skater/summary?&start=100&limit=100&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=3%20and%20seasonId=${STATS_YEAR}`
  )

  for (const stats of data.data)
  {
    const [strapiPlayer] = await strapi.query('player').
      find({ apiId: stats.playerId });

    const strapiStatsQuery = strapiPlayer.stats.find(
      ({ year }) => year == STATS_YEAR);

    // existing strapi stats found - update
    if (strapiStatsQuery)
    {
      console.log(`Updating Existing Stats for ${strapiPlayer.name}...`);
      await strapi.query('stat').update({ id: strapiStatsQuery.id }, {
        points: stats.points,
        goals: stats.goals,
        assists: stats.assists,
      });
    }
    // create new stats
    else
    {
      console.log(`Creating New Stats for ${strapiPlayer.name}...`);
      await strapi.query('stat').create({
        year: STATS_YEAR,
        type: 'playoffs',
        points: stats.points,
        goals: stats.goals,
        assists: stats.assists,
        player: strapiPlayer.id
      });
    }
  }
  console.log('Loaded NHL Playoff Stats!');
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