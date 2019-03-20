import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import LiveNHLScores from '../containers/LiveNHLScores';
import SelectedDatePicker from '../containers/SelectedDatePicker';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3
  }
});

let NHLScoresPage = ({ classes }) =>
(
  <main className={classes.root}>
    <Grid container alignItems="center">
      <Grid item>
        <Typography variant='h2'>
          Scores
        </Typography>
      </Grid>

      <Grid item>
        <SelectedDatePicker numDatesBefore={2} numDatesAfter={2} />
      </Grid>
    </Grid>

    <LiveNHLScores />
  </main>
);

NHLScoresPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NHLScoresPage);