import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { CalendarToday, BarChart, Settings } from '@material-ui/icons';

import FeatureListing from '../components/FeatureListing';

const styles = theme => ({
  landingImage: {
    backgroundImage: 'url(images/outdoor-rink.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    height: '75vh'
  },
  landingPromo: {
    width: '200px',
    marginLeft: '5%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '10%',
    },
  },
  landingHeader: {
    fontWeight: '900',
    fontSize: '8rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '5rem'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '3.5rem'
    },
  },
  features: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0px',
    flexWrap: 'no-wrap',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  }
});

class LandingPage extends Component 
{
  render() 
  {
    const { classes } = this.props;

    return (
      <div>
        <main className={classes.landingImage}>
          <div className={classes.landingPromo}>
            <Typography variant="h1" className={classes.landingHeader}>
              NHL Fantasy
            </Typography>
          </div>
        </main>
        <div className={classes.features}>
          <FeatureListing
            icon={<CalendarToday />}
            name="NHL Scores"
            description="View past, current, and scheduled games with live score updates."
          />
          <FeatureListing
            icon={<BarChart />}
            name="Fantasy Manager"
            description="Create your own fantasy pools. Invite your friends for betting or just bragging rights. View detailed history of past pools."
          />
          <FeatureListing
            icon={<Settings />}
            name="Statistics"
            description="View NHL player and team stats. Customize your pools scoring settings."
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);