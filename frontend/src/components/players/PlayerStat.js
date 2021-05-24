import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  name: {
    fontWeight: 800
  },
  inactive: {
    fontWeight: 400,
    opacity: '50%'
    //color: theme.palette.error.main,
    //textDecoration: 'line-through',
  }
}));

const PlayerStat = ({ value, active }) => 
{
  const classes = useStyles();

  return (
    <div className={clsx(
      classes.name,
      !active && classes.inactive
    )}>
      {`${value}`}
    </div>
  );
}

export default PlayerStat;