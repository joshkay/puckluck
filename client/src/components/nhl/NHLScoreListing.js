import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import NHLGameTeamScoreListing from './NHLScoresTeamListing';

const styles = 
{
  card: {
    width: 275,
  },
  title: {
    fontSize: 14
  }
};

let NHLGameScoreListing = ({ classes, homeTeam, awayTeam, date, status }) =>
(
  <Card className={classes.card}>
    <CardContent>
      <Typography className={classes.title}>
        { status }
      </Typography>
      <NHLGameTeamScoreListing id={homeTeam.id}
        name={homeTeam.name} score={homeTeam.score}
      />
      <NHLGameTeamScoreListing id={awayTeam.id}
        name={awayTeam.name} score={awayTeam.score}
      />
    </CardContent>
  </Card>
);

NHLGameScoreListing.propTypes = {
  classes: PropTypes.object.isRequired,
  homeTeam: PropTypes.object.isRequired,
  awayTeam: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default withStyles(styles)(NHLGameScoreListing);