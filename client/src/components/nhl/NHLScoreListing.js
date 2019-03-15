import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import NHLScoresTeamListing from './NHLScoresTeamListing';

const styles = 
{
  card: {
    width: 275,
  },
  title: {
    fontSize: 14
  }
};

const getGameStatus = (status, date) =>
{
  if (status === 'Final')
  {
    return status;
  }
  if (status === 'Scheduled')
  {
    return moment(date).format('h:mm A');
  }
}

const getGameScore = (status, score) =>
{
  if (status === 'Scheduled')
  {
    return null;
  }
  return score;
}

let NHLScoreListing = ({ classes, homeTeam, awayTeam, date, status }) =>
(
  <Card className={classes.card}>
    <CardContent>
      <Typography className={classes.title}>
        { getGameStatus(status, date) }
      </Typography>
      <NHLScoresTeamListing id={homeTeam.id}
        name={homeTeam.name} score={ getGameScore(status, homeTeam.score) }
      />
      <NHLScoresTeamListing id={awayTeam.id}
        name={awayTeam.name} score={ getGameScore(status, awayTeam.score) }
      />
    </CardContent>
  </Card>
);

NHLScoreListing.propTypes = {
  classes: PropTypes.object.isRequired,
  homeTeam: PropTypes.object.isRequired,
  awayTeam: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default withStyles(styles)(NHLScoreListing);