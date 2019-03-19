import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from '@date-io/moment';

import ResponsiveDrawer from './navigation/ResponsiveDrawer';
import LandingPage from '../pages/LandingPage';
import NHLScoresPage from '../pages/NHLScoresPage';

import configureStore from '../store';

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: { main: grey[900] },
    secondary: { main: deepPurple[600] }
  },
  typography: {
    useNextVariants: true,
  }
});

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

