const express = require('express');

const mainConfig = require('./config/main');
const routeConfig = require('./config/route');
const clientConfig = require('./config/client');

const app = express();

mainConfig.init(app, express);
routeConfig.init(app);
clientConfig.init(app, express);

module.exports = app;