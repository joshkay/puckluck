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

const hasGameStarted = (status) =>
{
  return (status !== 'Scheduled' && status !== 'Pre-Game');
}

const getGameStatus = (status, date, period, periodTimeLeft) =>
{
  if (!hasGameStarted(status))
  {
    return moment(date).format('h:mm A');
  }
  else if (status.includes('In Progress'))
  {
    return `${period} ${periodTimeLeft === 'END' ? 'Intermission' : periodTimeLeft}`;
  }

  return status;
}

const getGameScore = (status, score) =>
{
  if (hasGameStarted(status))
  {
    return score;
  }
}

let NHLScoreListing = ({ classes, homeTeam, awayTeam, date, status, period, periodTimeLeft }) =>
(
  <Card className={classes.card}>
    <CardContent>
      <Typography className={classes.title}>
        { getGameStatus(status, date, period, periodTimeLeft) }
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
  status: PropTypes.string.isRequired,
  period: PropTypes.string,
  periodTimeLeft: PropTypes.string
};

export default withStyles(styles)(NHLScoreListing);