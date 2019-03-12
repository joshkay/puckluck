import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { logoUrl } from '../../common/nhl/helpers';

const styles = 
{
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
};

let NHLGameTeamScoreListing = ({ classes, id, name, score }) =>
(
  <div className={classes.container}>
    <img src={logoUrl(id)} className={classes.logo} />
    <Typography>
      { name }
    </Typography>
    <Typography className={classes.score}>
      { score }
    </Typography>
  </div>
);

NHLGameTeamScoreListing.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired
};

export default withStyles(styles)(NHLGameTeamScoreListing);