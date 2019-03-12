import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import NHLGameScoreListing from './NHLGameScoreListing';

class NHLGameScores extends Component 
{
  constructor(props)
  {
    super(props);

    this.state = {
      games: null
    }
  }

  async componentDidMount()
  {
    const { data } = await axios.get('/api/nhl/scores');
    console.log(data);
  }

  render() 
  {
    return (
      <div>
        <NHLGameScoreListing
          homeTeam={{id:10,name:'Toronto Maple Leafs',score:2}}
          awayTeam={{id:14,name:'Tampa Bay Lightning',score:6}}
          status='Final'
        />
        <NHLGameScoreListing
          homeTeam={{id:10,name:'Toronto Maple Leafs',score:2}}
          awayTeam={{id:14,name:'Tampa Bay Lightning',score:6}}
          status='Final'
        />
      </div>
    );
  }
}

export default NHLGameScores;