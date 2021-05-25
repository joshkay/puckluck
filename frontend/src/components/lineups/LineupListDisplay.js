import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import PlayersGrid from './PlayersGrid';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles(theme => {
  const transition = {
    duration: theme.transitions.duration.shortest,
  };

  return {
    root: {
      overflow: 'visible',
      marginTop: 15,
      position: 'relative',
      backgroundColor: theme.palette.primary.main,
    },
    cardTop: {
      cursor: 'pointer',
      height: 30,
      display: 'flex',
      alignItems: 'center'
    },
    expanded: {},
    expandIcon: {
      marginLeft: 'auto',
      marginRight: 5,
      fill: theme.palette.primary.contrastText,
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', transition),
      '&:hover': {
        // Disable the hover effect for the IconButton,
        // because a hover effect should apply to the entire Expand button and
        // not only to the IconButton.
        backgroundColor: 'transparent',
      },
      '&$expanded': {
        transform: 'rotate(180deg)',
      },
    },
    cardHeading: {
      pointerEvents: 'none',
      display: 'flex', 
      flexDirection: 'row',
      position: 'absolute',
      width: '100%',
      height: 36,
      top: -15,
      '& > *': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        borderRadius: 18,
        marginLeft: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      }
    },
    placeNumber: {
      fontSize: 12,
      position: 'absolute',
      top: -5,
      left: -5,
      backgroundColor: theme.palette.secondary.main,
      border: `1px solid ${theme.palette.secondary.contrastText}`,
      height: 16,
      width: 16,
      //fontWeight: 800,
      lineHeight: '15px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    place: {
      width: 36,
      height: 36,
      position: 'relative',
    },
    points: {
      fontWeight: 800,
      fontSize: 30,
      //position: 'absolute',
      top: -10,
      left: 0,
      lineHeight: 1
    },
    leaderPoints: {
      //animation: `$bounceZoom 2s ${theme.transitions.easing.easeInOut} infinite`
    },
    pointsContainer: {
      marginLeft: 'auto',
      marginRight: theme.spacing(4),
      //transform: 'rotate(10deg)',
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
  }
});

const LineupListDisplay = ({ 
  expand, clearExpand,
  name, points, players, place, leader 
}) => 
{
  const classes = useStyles();
  const [expanded, setExpanded] = useState(expand);
  
  useEffect(() => {
    if (expand !== null)
    {
      setExpanded(expand);
    }
  }, [expand]);
  
  return (
    <Card className={classes.root}>
      <div className={classes.cardHeading}>
        <div className={classes.place}>
          <Typography
            variant="h3"
            className={classes.placeNumber}
          >
            #
          </Typography>
          <Typography
            variant="h3"
          >
            {place}
          </Typography>
        </div>
        
        <Typography
          variant="h3"
        >
          {name}
        </Typography>
        <div className={classes.pointsContainer}>
          <Box
            className={clsx(
              classes.points,
              leader && classes.leaderPoints
            )}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Typography variant="h3">
              {points}
            </Typography>
            <Box ml={1}>
              <Typography variant="h3">
                points
              </Typography>
            </Box>
          </Box>
        </div>
      </div>
      <Box 
        onClick={() => {
          clearExpand();
          setExpanded((prevExpanded) => !prevExpanded);
        }}
        className={classes.cardTop}
      >
        <KeyboardArrowDownIcon 
          className={clsx(classes.expandIcon, {
            [classes.expanded]: expanded,
          })} 
        />
      </Box>
      <Collapse in={expanded}>
        <PlayersGrid
          players={players}
        />
      </Collapse>
    </Card>
  );
}

export default LineupListDisplay;