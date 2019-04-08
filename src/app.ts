import express = require('express');

import * as mainConfig from './config/main';
import * as routeConfig from './config/route';
import * as clientConfig from './config/client';

const application = express();

mainConfig.init(application, express);
routeConfig.init(application);
clientConfig.init(application, express);

export const app = application;