module.exports = 
{
  init(app)
  {
    const nhlRoutes = require('../routes/nhl');
    
    app.use('/api', nhlRoutes);
  }
}