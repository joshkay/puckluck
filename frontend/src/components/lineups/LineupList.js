import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LineupListDisplay from './LineupListDisplay';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
}));

const LineupList = ({ expand, clearExpand, lineups }) => 
{
  const classes = useStyles();

  let place = 1;

  return (
    <Grid className={classes.root} 
      container 
      spacing={2}>
      {
        lineups !== undefined ? lineups.map((lineup, index) => 
        {
          if (index > 0 && lineups[index - 1].points > lineup.points)
          {
            place++;
          }

          return (
            <Grid key={index} item xs={12} md={6} lg={4}>
              <LineupListDisplay
                expand={expand}
                clearExpand={clearExpand}
                leader={lineups[0].points <= lineup.points}
                place={place}
                {...lineup} 
              />
            </Grid>
          )
        }) : null
      }
    </Grid>
  );
}

export default LineupList;