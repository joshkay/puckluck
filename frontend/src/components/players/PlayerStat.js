import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  stat: {
    fontWeight: 800
  },
  inactive: {
    fontWeight: 100,
    opacity: '50%'
  }
}));

const PlayerStat = ({ value, active }) => 
{
  const classes = useStyles();

  return (
    <div className={clsx(
      classes.stat,
      !active && classes.inactive
    )}>
      {`${value}`}
    </div>
  );
}

export default PlayerStat;