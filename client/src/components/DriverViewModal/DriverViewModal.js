import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

class Modal extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {
        return (
            <div>
                <h2>{this.state.heading}</h2>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(Modal);