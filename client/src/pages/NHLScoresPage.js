import React from 'react';
import { Typography } from '@material-ui/core';
import LiveNHLScores from '../containers/LiveNHLScores';

const NHLScoresPage = () =>
(
  <div>
    <Typography variant='h2'>
      Scores
    </Typography>

    <LiveNHLScores />
  </div>
);

export default NHLScoresPage;