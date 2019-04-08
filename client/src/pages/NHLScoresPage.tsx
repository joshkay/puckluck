import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import LiveNHLScores from '../containers/LiveNHLScores';
import SelectedDatePicker from '../containers/SelectedDatePicker';

const styles = (theme: Theme) => createStyles({
  root: {
    padding: theme.spacing.unit * 3
  }
});

interface Props extends WithStyles<typeof styles>
{
  width: string
}

class NHLScoresPage extends Component<Props>
{
  getNumDatesBefore(): number
  {
    const { width } = this.props;

    switch (width)
    {
      case 'xs':
        return 1;
      default:
        return 2;
    }
  }

  getNumDatesAfter(): number
  {
    const { width } = this.props;

    return this.getNumDatesBefore();
  }

  render()
  {
    const { width, classes } = this.props;

    return (
      <main className={classes.root}>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant='h2'>
              Scores
            </Typography>
          </Grid>
  
          <SelectedDatePicker numDatesBefore={this.getNumDatesBefore()}
            numDatesAfter={this.getNumDatesAfter()} />
        </Grid>
  
        <LiveNHLScores />
      </main>
    );
  }  
};

export default withWidth()(withStyles(styles)(NHLScoresPage));