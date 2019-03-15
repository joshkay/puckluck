import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import PersistentDrawerLeft from './PersistentDrawerLeft';
import LandingPage from '../pages/LandingPage';
import NHLScoresPage from '../pages/NHLScoresPage';

import configureStore from '../store';

const store = configureStore();

class App extends Component 
{
  render() 
  {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <PersistentDrawerLeft>
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route path='/nhl/scores' component={NHLScoresPage} />
            </Switch>
          </PersistentDrawerLeft>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;

