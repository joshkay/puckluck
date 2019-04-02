import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    //padding: theme.spacing.unit * 3,
  },
  drawerLink: {
    textDecoration: 'none',
    color: 'inherit',
    position: 'relative',
    display: 'flex'
  },
  drawerLinkIcon: {
    width: '1em',
    height: '1em',
    fontSize: '24px',
    display: 'inline-block',
    userSelect: 'none',
    flexShrink: 0
  },
  logo: {
    alignSelf: 'center'
  }
});

class ResponsiveDrawer extends React.Component 
{
  constructor(props)
  {
    super(props);

    this.handleDrawerToggle.bind(this);

    this.state = {
      mobileOpen: false,
    };
  }

  handleDrawerToggle = () => 
  {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <Link to={'/'} className={classes.logo}
              onClick={this.handleDrawerToggle}>
            <img alt="Puck Luck Icon" src={`${process.env.PUBLIC_URL}/favicon-dark.ico`} />
          </Link>
        </div>
        <Divider />
        <List>
          <Link to={'/nhl/scores'} className={classes.drawerLink}
              onClick={this.handleDrawerToggle}>
            <ListItem button>
              <ListItemIcon>
                <img alt="NHL Logo" className={classes.drawerLinkIcon} 
                  src="https://www-league.nhlstatic.com/images/logos/league-light/133.svg" />
              </ListItemIcon>
              <ListItemText primary="NHL Scores" />
            </ListItem>
          </Link>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
              data-cy="nav-open"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Puck Luck
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden mdUp implementation="js">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              data-cy="nav-mobile"
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="js">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
              data-cy="nav-desktop"
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <div className={classes.content} data-cy="content">
          <div className={classes.toolbar} />
          { this.props.children }
        </div>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);