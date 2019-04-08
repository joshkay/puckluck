import React, { Component } from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Team } from '../../store/games/types';
import { getGameScore, getGameStatus } from '../../common/nhl/helpers';

import NHLScoresTeamListing from './NHLScoresTeamListing';

const styles = createStyles({
  title: {
    fontSize: 14
  }
});

interface Props extends WithStyles<typeof styles>
{
  className: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  status: string;
  period: string;
  periodTimeLeft: string;
}

class NHLScoreListing extends Component<Props>
{
  render()
  {
    const { classes, className, homeTeam, awayTeam, date, status, period, periodTimeLeft } = this.props;

    return (
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
  }
}

export default withStyles(styles)(NHLScoreListing);