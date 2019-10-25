import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

class LoginButton extends Component {

  moveToLoginPage = (event) => {
    this.props.history.push('/login');
  }

  render() {
    return(
      <Button
        onClick={this.moveToLoginPage}
      >
        Log In
      </Button>
    )
  }
}

export default connect()(withRouter(LoginButton));
