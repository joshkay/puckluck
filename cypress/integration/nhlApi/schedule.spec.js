const axios = require('axios');
const moment = require('moment');
const nhlAPIActiveDate = require('../../../client/src/common/nhl/helpers').nhlAPIActiveDate;

/// <reference types="Cypress" />

describe('NHL API', () =>
{
  describe('schedule', () =>
  {
    it('should return schedule data for the current date', async (done) =>
    {
      const { data } = await axios.get('https://statsapi.web.nhl.com/api/v1/schedule');

      expect(data.dates.length).to.equal(1);
      expect(moment(nhlAPIActiveDate).isSame(data.dates[0].date, 'day')).to.be.true;

      done();
    });

    it('should return schedule data for the supplied date', async (done) =>
    {
      const date = '2019-03-09';
      const { data } = await axios.get(`https://statsapi.web.nhl.com/api/v1/schedule?date=${date}`);

      expect(data.dates.length).to.equal(1);
      expect(data.dates[0].date).to.equal(date);

      done();
    });

    it('should return game information in the expected format', async (done) =>
    {
      const date = '2019-03-09';
      const { data } = await axios.get(`https://statsapi.web.nhl.com/api/v1/schedule?date=${date}`);

      expect(data.dates[0].games.length).not.to.equal(0);
      expect(data.dates[0].games[0].teams.home.team.id).to.not.be.null;
      expect(data.dates[0].games[0].teams.home.team.name).to.not.be.null;;
      expect(data.dates[0].games[0].teams.home.score).to.not.be.null;;
      expect(data.dates[0].games[0].teams.away.team.id).to.not.be.null;;
      expect(data.dates[0].games[0].teams.away.team.name).to.not.be.null;;
      expect(data.dates[0].games[0].teams.away.score).to.not.be.null;;
      
      expect(data.dates[0].date).to.not.be.null;;
      expect(data.dates[0].state).to.not.be.null;;

      done();
    });
  });
});