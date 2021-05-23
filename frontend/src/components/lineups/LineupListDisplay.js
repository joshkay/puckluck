import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PlayersGrid from './PlayersGrid';

const useStyles = makeStyles({
});

const LineupListDisplay = ({ name, players }) => 
{
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <PlayersGrid
          players={players}
        />
      </CardContent>
    </Card>
  );
}

export default LineupListDisplay;