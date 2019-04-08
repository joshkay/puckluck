import React, { Component } from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { logoUrl } from '../../common/nhl/helpers';

const styles = createStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  logo: {
    maxWidth: '50px'
  },
  score: {
    marginLeft: 'auto'
  }
});

interface Props extends WithStyles<typeof styles>
{
  id: number;
  name: string;
  score: number | undefined;
}

class NHLScoresTeamListing extends Component<Props>
{
  render()
  {
    const { classes, id, name, score } = this.props;

    return (
      <div className={classes.container}>
        <img alt={ `${name}'s Team Logo` } src={logoUrl(id)} className={classes.logo} />
        <Typography>
          { name }
        </Typography>
        <Typography className={classes.score}>
          { score }
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(NHLScoresTeamListing);