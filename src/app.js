const express = require('express');

const mainConfig = require('./config/main');
const routeConfig = require('./config/route');

const app = express();

mainConfig.init(app, express);
routeConfig.init(app);

module.exports = app;