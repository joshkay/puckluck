import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

import NHLScoreListing from './NHLScoreListing';

const SCORE_UPDATE_INTERVAL = 10 * 1000;
//const GAME_SCHEDULE_UPDATE_INTERVAL = 60 * 1000;

const styles = {
  card: {
    minWidth: 275,
    width: '100%'
  },
  hide: {
    visibility: 'hidden',
    height: 0,
    paddingTop: '0!important',
    paddingBottom: '0!important'
  }
};

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
      const { classes } = this.props;
      const gameListings = games.items.map((game, index) =>
      (
        <Grid item xs={12} sm key={ index }>
          <NHLScoreListing className={classes.card}
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

  renderFakeFlexItems(amount)
  {
    const { classes } = this.props;
    const fakes = Array.from(new Array(amount)).map((ele, index) =>
    (
      <Grid item xs={12} sm key={ index } className={classes.hide}>
        <div className={classes.card}></div>
      </Grid>
    ));

    return fakes;
  }

  render() 
  {
    const { date, games } = this.props;

    return (
      [
        <Typography key={0} variant='h5' data-cy="nhl-scores-date">
          { moment(date).format('MMMM Do, YYYY') }
        </Typography>
      ,
        <Grid key={1} container spacing={16}>
          { this.renderGames(games) }
          { this.renderFakeFlexItems(10) }
        </Grid>
      ]
    );
  }
}

NHLScores.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  games: PropTypes.object
};

export default withStyles(styles)(NHLScores);