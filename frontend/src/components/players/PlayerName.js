import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import HealingIcon from '@material-ui/icons/Healing';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  name: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 800
  },
  inactive: {
    fontWeight: 100,
    opacity: '50%'
  },
  injury: {
    fill: '#D8AF81'
  },
}));

const PlayerName = ({ firstName, lastName, active, injury }) => 
{
  const classes = useStyles();

  return (
    <div className={clsx(
      classes.name,
      !active && classes.inactive,
    )}>
      {`${firstName} ${lastName}`}
      {injury && (
        <Tooltip title={
          <>
            <Typography>
              {injury.startDate}
            </Typography>
            {
              injury.returns ? (
                <Typography>
                  {injury.returns}
                </Typography>
              ) : null
            }
            {
              injury.type && injury.type !== '-' ? (
                <Typography>
                  {injury.type}
                </Typography>
              ) : null
            }
            <Typography>
              {injury.status}
            </Typography>
          </>
        } placement="right">
          <Box ml={0.5} display="flex" alignItems="center">
          {
            injury.status === 'Suspended' ? (
              <ErrorOutlineIcon color="error" />
            ) : (
              <HealingIcon className={classes.injury} />
            )
          }
          </Box>
        </Tooltip>
      )}
    </div>
  );
}

export default PlayerName;