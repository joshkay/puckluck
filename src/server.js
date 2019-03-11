const app = require('./app');

const port = process.env.PORT || 5000;

let server = app.listen(port);

server.on('listening', () =>
{
  console.log(`Server is listening on PORT ${server.address().port}`);
});