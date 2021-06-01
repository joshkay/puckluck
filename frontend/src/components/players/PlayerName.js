import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import HealingIcon from '@material-ui/icons/Healing';
import { Tooltip, Typography } from '@material-ui/core';

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
    marginLeft: theme.spacing(0.5)
  }
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
            <Typography>
              {injury.returns}
            </Typography>
            <Typography>
              {injury.type}
            </Typography>
            <Typography>
              {injury.status}
            </Typography>
          </>
        } placement="right">
          <HealingIcon color="secondary" className={classes.injury} />
        </Tooltip>
      )}
    </div>
  );
}

export default PlayerName;