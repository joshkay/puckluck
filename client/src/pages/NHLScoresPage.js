import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import LiveNHLScores from '../containers/LiveNHLScores';
import SelectedDatePicker from '../containers/SelectedDatePicker';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3
  }
});

let NHLScoresPage = ({ width, classes }) =>
{
  const getNumDatesBefore = (width) =>
  {
    switch (width)
    {
      case 'xs':
        return 1;
      default:
        return 2;
    }
  };

  const getNumDatesAfter = (width) =>
  {
    return getNumDatesBefore(width);
  }

  return (
    <main className={classes.root}>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant='h2'>
            Scores
          </Typography>
        </Grid>

        <SelectedDatePicker numDatesBefore={getNumDatesBefore(width)}
          numDatesAfter={getNumDatesAfter(width)} />
      </Grid>

      <LiveNHLScores />
    </main>
  );
};

NHLScoresPage.propTypes = {
  width: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

export default withWidth()(withStyles(styles)(NHLScoresPage));