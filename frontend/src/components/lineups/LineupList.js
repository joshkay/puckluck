import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LineupListDisplay from './LineupListDisplay';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
}));

const LineupList = ({ lineups }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} 
      container 
      spacing={2}>
      {
        lineups !== undefined ? lineups.map((lineup, index) => (
          <Grid key={index} item xs={6}>
            <LineupListDisplay {...lineup} />
          </Grid>
        )) : null
      }
    </Grid>
  );
}

export default LineupList;