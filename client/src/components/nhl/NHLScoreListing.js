import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { getGameScore, getGameStatus } from '../../common/nhl/helpers';

import NHLScoresTeamListing from './NHLScoresTeamListing';

const styles = 
{
  title: {
    fontSize: 14
  }
};

let NHLScoreListing = ({ classes, className, homeTeam, awayTeam, date, status, period, periodTimeLeft }) =>
(
  <Card className={className} data-cy="nhl-score-listing">
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
  className: PropTypes.string.isRequired,
  homeTeam: PropTypes.object.isRequired,
  awayTeam: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  period: PropTypes.string,
  periodTimeLeft: PropTypes.string
};

export default withStyles(styles)(NHLScoreListing);