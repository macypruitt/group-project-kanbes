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
  // Hidden
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';



const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      // color: lightGreen[300]
    },
    appBar: {
      colorPrimary: lightGreen[300],
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% -${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  });

class KanbeTemplate extends Component {
  state = {
    open: false
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    
    return (
      <div className={this.props.classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(this.props.classes.appBar &&
            this.props.classes.appBarShift)}
        >
          <Toolbar>
            <IconButton
              color='primary'
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              // className={clsx(this.props.classes.menuButton &&
              //   this.props.classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Kanbe's Market
                        </Typography>
          </Toolbar>
        </AppBar>
        {/* <nav className={this.props.classes.drawer} aria-label="mailbox folders"> */}
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            className={this.props.classes.drawer}
            variant="persistent"
            anchor={'left'}
            open={this.state.open}
            classes={{
              paper: this.props.classes.drawerPaper,
            }}
          >
            <div className={this.props.classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                {/* {this.props.theme.direction === 'ltr' ? 
                <ChevronLeftIcon /> :  */}
                <ChevronRightIcon />
                {/* } */}
              </IconButton>
            </div>
            <Divider />
            {/* {drawer} */}
          </Drawer>
          {/* <Drawer
                      classes={{
                        paper: this.props.classes.drawerPaper,
                      }}
                      variant="permanent"
                      open
                    >
                      {drawer}
                    </Drawer> */}
        <main className={this.props.classes.content}>
          <div className={this.props.classes.toolbar} />
          <h1>Template!</h1>
        </main>
      </div>
    );
  }

}

export default withStyles(styles)(KanbeTemplate);