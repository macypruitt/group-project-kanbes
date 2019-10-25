import React, { Component } from 'react';

import clsx from 'clsx';

import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Divider,
  Container,
  // List,
  // Hidden
} from '@material-ui/core';


import MenuIcon from '@material-ui/icons/Menu';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PersonIcon from '@material-ui/icons/Person';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LoginButton from '../LoginButton/LoginButton';
import LogOutButton from '../LogOutButton/LogOutButton';
import NavAdmin from '../Nav/Nav.Admin';
import NavDriver from '../Nav/Nav.Driver';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { connect } from 'react-redux';
import './KanbeTemplate.css';

//Styling for appbar and drawer in Material UI
const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
      backgroundColor: '#a4bd83',
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  });

//Component for template: AppBar affects Green bar across the top Drawer is sliding nav
class KanbeTemplate extends Component {
  state = {
    open: false,
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const adminLevel = this.props.store.user.admin_level;
    const userName = this.props.store.user.first_name;
    let drawer;
   
    if (adminLevel == 1) {
      drawer =
        <div>
          <Divider />
          <NavAdmin />
          <NavDriver />
        </div>
    }

    if (adminLevel == 2) {
      drawer =
        <div>
          <Divider />
          <NavDriver />
        </div>
    }

    //Will show logout button when a user is logged in, redirects to login page when pushed
    let button;
    let user = this.props.store.user.id;
    if(user == !null){
      button = <LoginButton />
    }else{
      button = <LogOutButton />
    }

    return (
      <div className={this.props.classes.root}>
        <CssBaseline />
        <AppBar 
          position="absolute"
          className={clsx(this.props.classes.appBar, {
            [this.props.classes.appBarShift]: this.state.open,
          })}
          className="hide-appbar"
        >
          <Toolbar className={this.props.classes.toolbar} >
            <IconButton
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(this.props.classes.menuButton, this.state.open &&
                this.props.classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography align="left" className="kantrack" variant="h6" noWrap className={this.props.classes.title}>
              KanTrack
            </Typography>
          </Toolbar>
        </AppBar>
        {/* <nav className={this.props.classes.drawer} aria-label="mailbox folders"> */}
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          className={this.props.classes.drawer}
          className="hide-drawer"
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: clsx(this.props.classes.drawerPaper, !this.state.open && this.props.classes.drawerPaperClose),
          }}
        >
          <div className={this.props.classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              {/* {this.props.theme.direction === 'ltr' ? 
                <ChevronLeftIcon /> :  */}
              <ChevronLeftIcon />
              {/* } */}
            </IconButton>
          </div>
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={userName} />
          </ListItem>
          
          {drawer}
          <Divider />
          {button}
          <Divider />
          
        </Drawer>

        <main className={this.props.classes.content}>
          <div className={this.props.classes.appBarSpacer} />
          <Container maxWidth="lg" className={this.props.classes.container} className='kanbe-container'>
            {this.props.children}
          </Container>
        </main>
      </div>
    );
  }

}

export default connect(mapStoreToProps)(withStyles(styles)(KanbeTemplate));