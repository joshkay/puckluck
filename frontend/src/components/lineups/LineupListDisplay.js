import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PlayersGrid from './PlayersGrid';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  points: {
    fontWeight: 800,
    fontSize: 30,
    position: 'absolute',
    top: -10,
    left: 0,
    lineHeight: 1,
  },
  leaderPoints: {
    animation: `$bounceZoom 2s ${theme.transitions.easing.easeInOut} infinite`
  },
  pointsContainer: {
    transform: 'rotate(10deg)',
  },
  pointTicks: {
    fontSize: 15,
    margin: 5,
    fontWeight: 1200
  },
  '@keyframes bounceZoom': {
    '0%': {
      transform: 'scale(1, 1) translate(0px, 0px)'
    },
    '50%': {
      transform: 'scale(1.5, 1.5) translate(0px, -5px)'
    },
    '100%': {
      transform: 'scale(1, 1) translate(0px, 0px)'
    }
  }
}));

const LineupListDisplay = ({ name, points, players, place, leader }) => 
{
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Box 
          display="flex" 
          flexDirection="row"
          alignItems="top"
          mb={1}
        >
          <Box mr={1}>
            <Typography 
              color="secondary" 
              variant="h5" 
              component="h2"
            >
              {`#${place}`}
            </Typography>
          </Box>
         
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Box 
            position="relative"
            className={classes.pointsContainer}
          >
            <Box
              className={clsx(
                classes.points,
                leader && classes.leaderPoints
              )}
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              <Typography
                className={classes.pointTicks}
                color="secondary"
                variant="h5" 
                component="h3"
              >
                {'<'}
              </Typography>
              <Typography
                color="secondary"
                variant="h5" 
                component="h3"
              >
                {points}
              </Typography>
              <Typography
                className={classes.pointTicks}
                color="secondary"
                variant="h5" 
                component="h3"
              >
                {'>'}
              </Typography>
            </Box>
          </Box>
        </Box>
        <PlayersGrid
          players={players}
        />
      </CardContent>
    </Card>
  );
}

export default LineupListDisplay;