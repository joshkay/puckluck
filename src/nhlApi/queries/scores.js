const axios = require('axios');

const logoUrl = (id) => `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${id}.svg`;

module.exports =
{
  async getScores()
  {
    const { data } = await axios.get('https://statsapi.web.nhl.com/api/v1/schedule');

    const parsedData =
    {
      games: data.dates[0].games.map(game => (
        {
          home:
          {
            id: game.teams.home.team.id,
            team: game.teams.home.team.name,
            score: game.teams.home.score
          },
          away:
          {
            id: game.teams.away.team.id,
            team: game.teams.away.team.name,
            score: game.teams.away.score
          },
          date: game.gameDate,
          state: game.status.detailedState
        }
      ))
    }

    return parsedData;
  }
}