import React from 'react';
import { Typography } from '@material-ui/core';
import NHLGameScores from '../components/nhl/NHLGameScores';

const NHLScores = () =>
(
  <div>
    <Typography variant='h2'>
      Scores
    </Typography>

    <NHLGameScores />
  </div>
);

export default NHLScores;