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
    const url = urlBase + params;

    const { data } = await axios.get(url);

    const parsedData = data.dates.length ?
    {
      dates: Object.assign(...data.dates.map(date => (
      {
        [date.date]: 
        {
          games: date.games.map(game => (
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
              status: game.status.detailedState,
              currentPeriodName: game.linescore.currentPeriodOrdinal,
              currentPeriodTimeLeft: game.linescore.currentPeriodTimeRemaining
            }
          ))
        } 
      })))
    } : { dates: {} };

    return parsedData;
  }
}