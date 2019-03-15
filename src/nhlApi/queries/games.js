const axios = require('axios');

module.exports =
{
  async getGames(date, endDate)
  {
    const urlBase = 'https://statsapi.web.nhl.com/api/v1/schedule?hydrate=linescore';
    let params = '';
    if (date && endDate)
    {
      params = `&startDate=${date}&endDate=${endDate}`;
    }
    else if (date)
    {
      params = `&date=${date}`;
    }
    console.log(date);
    console.log(endDate);
    const url = urlBase + params;
    console.log(url);

    const { data } = await axios.get(url);

    const parsedData =
    {
      dates: 
      {
        ...data.dates.map(date => (
        { 
          [date.date]: 
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
        }))
      }
    };

    return parsedData;
  }
}