const axios = require('axios');
const moment = require('moment');

describe('NHL API', () =>
{
  describe('schedule', () =>
  {
    it('should return schedule data for the current date', async (done) =>
    {
      const { data } = await axios.get('https://statsapi.web.nhl.com/api/v1/schedule');

      expect(data.dates.length).toBe(1);
      expect(moment().isSame(data.dates[0].date, 'day')).toBe(true);

      done();
    });

    it('should return schedule data for the supplied date', async (done) =>
    {
      const date = '2019-03-09';
      const { data } = await axios.get(`https://statsapi.web.nhl.com/api/v1/schedule?date=${date}`);

      expect(data.dates.length).toBe(1);
      expect(data.dates[0].date).toBe(date);

      done();
    });

    it('should return game information in the expected format', async (done) =>
    {
      const date = '2019-03-09';
      const { data } = await axios.get(`https://statsapi.web.nhl.com/api/v1/schedule?date=${date}`);

      expect(data.dates[0].games.length).toBeGreaterThan(0);
      expect(data.dates[0].games[0].teams.home.team.id).not.toBeNull();
      expect(data.dates[0].games[0].teams.home.team.name).not.toBeNull();
      expect(data.dates[0].games[0].teams.home.score).not.toBeNull();
      expect(data.dates[0].games[0].teams.away.team.id).not.toBeNull();
      expect(data.dates[0].games[0].teams.away.team.name).not.toBeNull();
      expect(data.dates[0].games[0].teams.away.score).not.toBeNull();
      
      expect(data.dates[0].date).not.toBeNull();
      expect(data.dates[0].state).not.toBeNull();

      done();
    });
  });
});