const axios = require('axios');

module.exports =
{
  async getScores()
  {
    const { data } = await axios.get('https://statsapi.web.nhl.com/api/v1/schedule?hydrate=linescore');

    const parsedData =
    {
      games: data.dates[0].games.map(game => (
        {
          home:
          {
            id: game.teams.home.team.id,
            name: game.teams.home.team.name,
            score: game.teams.home.score
          },
          away:
          {
            id: game.teams.away.team.id,
            name: game.teams.away.team.name,
            score: game.teams.away.score
          },
          date: game.gameDate,
          status: game.status.detailedState
        }
      ))
    }

    return parsedData;
  }
}