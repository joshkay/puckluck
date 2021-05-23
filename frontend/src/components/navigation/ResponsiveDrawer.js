import React, { useState } from 'react';
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
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Link from 'next/link';
import UserNavigation from '../users/UserNavigation';
import PoolIcon from '@material-ui/icons/Pool';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    marginLeft: drawerWidth
  },
  menuButton: {
    marginRight: 20,
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
  },
  userSection: {
    marginLeft: 'auto'
  }
}));

const ResponsiveDrawer = ({ theme, container, children }) =>
{
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => 
  {
    setMobileOpen((prevMobileOpen) => !prevMobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Link href="/">
          <a className={classes.logo} onClick={handleDrawerToggle}>
            <img 
              alt="Puck Luck Icon" 
              src="/favicon-dark.ico" 
            />
          </a>
        </Link>
      </div>
      <Divider />
      <List>
        {/* <Link href="/nhl/scores">
          <a
            className={classes.drawerLink}
            onClick={handleDrawerToggle}
          >
            <ListItem button>
              <ListItemIcon>
                <img alt="NHL Logo" className={classes.drawerLinkIcon} 
                  src="https://www-league.nhlstatic.com/images/logos/league-light/133.svg" />
              </ListItemIcon>
              <ListItemText primary="NHL Scores" />
            </ListItem>
          </a>
        </Link> */}
        <Link href="/pools">
          <a
            className={classes.drawerLink}
            onClick={handleDrawerToggle}
          >
            <ListItem button>
              <ListItemIcon>
                <PoolIcon/>
              </ListItemIcon>
              <ListItemText primary="Pools" />
            </ListItem>
          </a>
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
            onClick={handleDrawerToggle}
            className={classes.menuButton}
            data-cy="nav-open"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            Puck Luck
          </Typography>

          <div className={classes.userSection}>
            <UserNavigation />
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          data-cy="nav"
        >
          {drawer}
        </Drawer>
      </nav>
      <div className={classes.content} data-cy="content">
        <div className={classes.toolbar} />
        { children }
      </div>
    </div>
  );
}

export default withTheme(ResponsiveDrawer);