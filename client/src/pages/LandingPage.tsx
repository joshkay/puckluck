import React, { Component } from 'react';
import { Typography, Grid, Theme } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { CalendarToday, BarChart, Settings } from '@material-ui/icons';

import FeatureListing from '../components/FeatureListing';

const styles = (theme: Theme) => createStyles({
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
    fontWeight: 900,
    fontSize: '3.5rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '5rem'
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '8rem'
    },
  }
});

interface Props extends WithStyles<typeof styles> {}

class LandingPage extends Component<Props>
{
  render() 
  {
    const { classes } = this.props;

    return (
      <div>
        <main className={classes.landingImage} data-cy="landing-container">
          <div className={classes.landingPromo}>
            <Typography variant="h1" className={classes.landingHeader} data-cy="landing-header">
              NHL Fantasy
            </Typography>
          </div>
        </main>
        <Grid container alignItems="stretch" justify="center" data-cy="landing-features">
          <Grid item sm={12} md={4}>
            <FeatureListing
              icon={<CalendarToday />}
              name="NHL Scores"
              description="View past, current, and scheduled games with live score updates."
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <FeatureListing
              icon={<BarChart />}
              name="Fantasy Manager"
              description="Create your own fantasy pools. Invite your friends for betting or just bragging rights. View detailed history of past pools."
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <FeatureListing
              icon={<Settings />}
              name="Statistics"
              description="View NHL player and team stats. Customize your pools scoring settings."
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);