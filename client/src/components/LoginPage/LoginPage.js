import React, { Component } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  // Link,
  // Grid,
  // Box,
  Container,
  Typography

} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { grey } from '@material-ui/core/colors';
import KanbeLogo from './KanbeLogo.png';
import './LoginPage.css';

const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      color: grey[400],
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#a4bd83'
    },
  });

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    })
  }

  render() {


    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <img className={'kanbe-img'} src={KanbeLogo} alt="Kanbe's Market Logo" />
        <div className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
            </Typography>
          <form className={this.props.classes.form} onSubmit={this.login}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="Username"
              autoComplete="Username"
              autoFocus
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
              onClick={() => { this.props.dispatch({ type: 'FETCH_USER' }) }}
            >
              Sign In
          </Button>

          </form>
        </div>

      </Container>
    );

  }

}

export default connect(mapStoreToProps)(withStyles(styles)(LoginPage));