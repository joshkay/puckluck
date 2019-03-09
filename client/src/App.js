import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import PersistentDrawerLeft from './components/PersistentDrawerLeft';
import Landing from './pages/Landing';
import NHLScores from './pages/NHLScores';

class App extends Component 
{
  render() 
  {
    return (
      <BrowserRouter>
        <PersistentDrawerLeft>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/nhl/scores' component={NHLScores} />
          </Switch>
        </PersistentDrawerLeft>
      </BrowserRouter>
    );
  }
}

export default App;

