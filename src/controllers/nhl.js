const nhlScoresQueries = require('../nhlApi/queries/scores');
const nhlScheduleQueries = require('../nhlApi/queries/schedule');

module.exports = 
{
  async scores(req, res, next)
  {
    let scores = await nhlScoresQueries.getScores();

    res.json(scores);
  },
  async schedule(req, res, next)
  {
    let schedule = await nhlScheduleQueries.getSchedule();

    res.json(schedule);
  }
};