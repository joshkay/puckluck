import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';

import NHLScoreListing from './NHLScoreListing';

const styles =
{
  root: {
    flexGrow: 1,
  }
}

const SCORE_UPDATE_INTERVAL = 10 * 1000;
const GAME_SCHEDULE_UPDATE_INTERVAL = 60 * 1000;

class NHLScores extends Component 
{
  constructor(props)
  {
    super(props);

    this.state = {
      games: null
    }

    this.scoreUpdateInterval = null;
    this.gameScheduleUpdateInterval = null;
  }

  componentDidMount()
  {
    this.startUpdatesForDate(this.props.date);
  }
  
  componentWillUnmount()
  {
    this.stopLiveUpdate();
  }

  componentDidUpdate(prevProps) 
  {
    if (this.props.date !== prevProps.date) 
    {
      this.startUpdatesForDate(this.props.date);
    }
    if (this.props.activeDate !== prevProps.activeDate)
    {
      this.startLiveUpdateIfNeeded(this.props.date);
    }
  }

  startUpdatesForDate(date)
  {
    this.props.onScoreLoadRequest(date);
    this.startLiveUpdateIfNeeded(date);
  }

  startLiveUpdateIfNeeded(date)
  {
    if (this.props.activeDate === date)
    {
      this.startLiveUpdate();
    }
    else
    {
      this.stopLiveUpdate();
    }
  }

  startLiveUpdate()
  {
    this.scoreUpdateInterval = setInterval(this.liveUpdate.bind(this), SCORE_UPDATE_INTERVAL);
  }

  stopLiveUpdate()
  {
    if (this.scoreUpdateInterval)
    {
      clearInterval(this.scoreUpdateInterval);
      this.scoreUpdateInterval = null;
    }
  }

  liveUpdate()
  {
    // check if games are in progress - update scores
    this.updateScores();
  }

  updateScores()
  {
    // only update scores for the current day!
    this.props.onScoreUpdateRequest();
  }

  renderGames(games)
  {
    if (games && games.items)
    {
      const gameListings = games.items.map((game, index) =>
      (
        <Grid item key={ index }>
          <NHLScoreListing
            homeTeam={{ id: game.home.id, name: game.home.name, score: game.home.score }}
            awayTeam={{ id: game.away.id, name: game.away.name, score: game.away.score }}
            date={ game.date } status={ game.status }
            period={ game.currentPeriodName } periodTimeLeft={ game.currentPeriodTimeLeft }
          />
        </Grid>
      ));

      return gameListings;
    }
  }

  render() 
  {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant='h5'>
          { moment(this.props.date).format('MMMM Do YYYY') }
        </Typography>
        <Grid container className={classes.root} spacing={16}>
          { this.renderGames(this.props.games) }
        </Grid>
      </div>
    );
  }
}

NHLScores.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NHLScores);