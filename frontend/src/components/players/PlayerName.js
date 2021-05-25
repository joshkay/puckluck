import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  name: {
    fontWeight: 400
  },
  inactive: {
    fontWeight: 100,
    opacity: '50%'
    //color: theme.palette.error.main,
    //textDecoration: 'line-through',
  }
}));

const PlayerName = ({ firstName, lastName, active }) => 
{
  const classes = useStyles();

  return (
    <div className={clsx(
      classes.name,
      !active && classes.inactive
    )}>
      {`${firstName} ${lastName}`}
    </div>
  );
}

export default PlayerName;