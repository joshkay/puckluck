import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

import NHLScoreListing from './NHLScoreListing';

const styles =
{
  root: {
    flexGrow: 1,
  }
}

class NHLScores extends Component 
{
  constructor(props)
  {
    super(props);

    this.state = {
      games: null
    }
  }

  componentDidMount()
  {
    this.props.onScoreUpdateRequest(moment().format('YYYY-MM-DD'));
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
            date={ game.date }
            status={ game.status }
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
      <Grid container className={classes.root} spacing={16}>
        { this.renderGames(this.props.games) }
      </Grid>
    );
  }
}

NHLScores.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NHLScores);