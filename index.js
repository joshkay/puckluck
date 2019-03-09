const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/getPools', (req, res) =>
{
  let pools = ['Fantasy 1', 'Fantasy 2', 'Fantasy 3'];
  res.json(pools);
  console.log('Sent pools');  
});

app.get('*', (req, res) =>
{
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const port = process.env.PORT || 5000;

let server = app.listen(port);

server.on('listening', () =>
{
  console.log(`Server is listening on PORT ${server.address().port}`);
});