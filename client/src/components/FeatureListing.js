import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';;

const styles = theme => ({
  feature: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '40px',
    paddingTop: '60px',
    backgroundColor: theme.palette.background.default
  },
  icon: {
    fontSize: '3rem',
    margin: '10px'
  },
  name: {
    fontSize: '2.5rem',
    margin: '10px'
  },
  description: {
    fontSize: '1.2rem',
    margin: '10px'
  }
});

let FeatureListing = ({ classes, icon, name, description }) =>
(
  <div className={classes.feature}>
    {React.cloneElement(icon, { className: classes.icon })}
    <Typography variant="h2" align="center" className={classes.name}>
      {name}
    </Typography>
    <Typography color="secondary" align="center" className={classes.description}>
      {description}
    </Typography>
  </div>
);

export default withStyles(styles)(FeatureListing);