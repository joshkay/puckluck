const axios = require('axios');

const BASE_URL = 'https://statsapi.web.nhl.com/api/v1'

const loadPlayers = async () => {
  console.log('Loading NHL Players & Teams');

  await strapi.query('team').delete();
  await strapi.query('player').delete();
  //return;

  const { data: playoffsData } = await axios.get(
    `${BASE_URL}/tournaments/playoffs?expand=round.series`
  );

  for (const series of playoffsData.rounds[0].series)
  {
    for (const team of series.matchupTeams)
    {
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
        strapiTeam = strapiTeamQuery[0].id;
      }

      const { data: teamRoster } = await axios.get(
        `${BASE_URL}/teams/${teamId}/roster`
      );

      for (const player of teamRoster.roster)
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

        const strapiPlayerQuery = await strapi.query('player').
          find({ apiId: id });

        // Player is not in database
        if (strapiPlayerQuery.length === 0)
        {
          await strapi.query('player').create({
            apiId: id,
            name: `${fullName} (${strapiTeam.abbreviation})`,
            firstName,
            lastName,
            position: positionCode,
            jerseyNumber: primaryNumber,
            team: strapiTeam.id
          })
        }
      }

      console.log(`Team Loaded: ${team.team.name}`);
    }
  }

  console.log('NHL Players & Teams Loaded!');
}

module.exports = {
  loadPlayers
}