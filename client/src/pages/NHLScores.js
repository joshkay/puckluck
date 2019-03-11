import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import logo from '../logo.svg';
import '../App.css';

class NHLScores extends Component 
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
        <h1>Scores</h1>
        { this.state.games }
      </div>
    );
  }
}

export default NHLScores;