import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from '@date-io/moment';
import 'typeface-karla';

import ResponsiveDrawer from './navigation/ResponsiveDrawer';
import LandingPage from '../pages/LandingPage';
import NHLScoresPage from '../pages/NHLScoresPage';

import configureStore from '../store';
import theme from '../theme';

const store = configureStore();

class App extends Component 
{
  render() 
  {
    return (
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <BrowserRouter>
            <Provider store={store}>
              <ResponsiveDrawer>
                <Switch>
                  <Route exact path='/' component={LandingPage} />
                  <Route path='/nhl/scores' component={NHLScoresPage} />
                </Switch>
              </ResponsiveDrawer>
            </Provider>
          </BrowserRouter>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;

