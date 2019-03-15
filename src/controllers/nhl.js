const nhlGamesQueries = require('../nhlApi/queries/games');

module.exports = 
{
  async games(req, res, next)
  {
    console.log('games');
    let scores = await nhlGamesQueries.getGames();

    res.json(scores);
  },
  async gamesOnDate(req, res, next)
  {
    console.log('gamesOnDate');
    const date = req.params.date;
    let scores = await nhlGamesQueries.getGames(date);

    res.json(scores);
  },
  async gamesInDateRange(req, res, next)
  {
    console.log('gamesInDateRange');
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    let scores = await nhlGamesQueries.getGames(startDate, endDate);

    res.json(scores);
  }
};