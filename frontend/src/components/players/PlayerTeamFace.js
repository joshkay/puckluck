import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';

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
  }
}));

const PlayerTeamFace = ({ apiId, teamApiId, active }) => 
{
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row" 
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
    </Box>
  );
}

export default PlayerTeamFace;