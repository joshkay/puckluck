import * as path from 'path';

export const init = (app, express) =>
{
  app.use(express.static(path.join(__dirname, '../../client/build')));
  app.get('*', (req, res) =>
  {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  });
}