const axios = require('axios');

module.exports =
{
  async getSchedule()
  {
    const { data } = await axios.get('https://statsapi.web.nhl.com/api/v1/schedule');
    return data;
  }
}