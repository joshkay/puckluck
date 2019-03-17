import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import LiveNHLScores from '../containers/LiveNHLScores';
import SelectedDatePicker from '../containers/SelectedDatePicker';

const NHLScoresPage = () =>
(
  <div>
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
  </div>
);

export default NHLScoresPage;