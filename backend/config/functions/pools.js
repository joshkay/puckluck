const poolsSeed = require('../../seeds/pools');

const createKayPools = async () =>
{
  await strapi.query('pool').delete();
  await strapi.query('lineup').delete();

  for (const { lineups, ...pool } of poolsSeed)
  {
    const strapiPool = await strapi.query('pool')
      .create(pool);
    
    for (const { players, ...lineup } of lineups)
    {
      const strapiPlayers = await Promise.all(
        players.map(async (name) => {
          const { id } = await strapi.query('player')
            .findOne({
              name
            });
          return id;
        })
      )

      await strapi.query('lineup')
        .create({
          ...lineup,
          pool: strapiPool.id,
          players: strapiPlayers
        });
    }
  }
}

module.exports = {
  createKayPools
}