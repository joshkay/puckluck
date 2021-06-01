import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  teamLogo: {
    height: 30,
    marginLeft: -10 
  },
  playerLogo: {
    height: 40, 
    objectFit: 'cover',
    border: '1px solid rgb(224, 224, 224)',
    borderRadius: '50%',
    width: 35,
    height: 35,
    marginLeft: 0,
    boxShadow: '0 10px 6px -6px #777'
  },
  inactive: {
    filter: 'grayscale(100%)',
    opacity: '50%'
  },
  gameToday: {
    backgroundColor: theme.palette.success.main,
    height: 15,
    width: 15,
    position: 'absolute',
    borderRadius: '50%',
    border: `1px solid ${theme.palette.success.main}`,
    right: -10,
    '& > div': {
      backgroundColor: theme.palette.success.main,
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      border: `2px solid white`,
    }
  }
}));

const PlayerTeamFace = ({ apiId, teamApiId, gameToday, active }) => 
{
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row" position="relative"
      justifyContent="center" alignItems="center">
      <img 
        className={clsx(
          classes.teamLogo,
          !active && classes.inactive
        )}
        src={`//www-league.nhlstatic.com/images/logos/teams-20202021-light/${teamApiId}.svg`}
      />
      <img
        className={clsx(
          classes.playerLogo,
          !active && classes.inactive
        )}
        src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${apiId}.jpg`}
      />
      {
        gameToday ? (
          <Tooltip title="Game Today" placement="top">
            <div className={classes.gameToday}>
              <div></div>
            </div>
          </Tooltip>
        ) : null
      }
    </Box>
  );
}

export default PlayerTeamFace;