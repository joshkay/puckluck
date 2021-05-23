import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PoolListDisplay from './PooListDisplay';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
}));

const PoolList = ({ pools }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} 
      container 
      spacing={2}>
      {
        pools !== undefined ? pools.map((pool, index) => (
          <Grid key={index} item md={3}>
            <PoolListDisplay {...pool} />
          </Grid>
        )) : null
      }
    </Grid>
  );
}

export default PoolList;