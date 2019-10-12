import React, { Compenent } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';




class DriverView extends Component {
    state = {
        heading: 'Driver View',
        productStats: {
            par: '',
            lastPar: '',
            sold: '',
            shrink: '',
            added: '',
        },
        productStats: [],

    };
    render() {
        return (
            <div>
                <h1>{this.state.heading}</h2>
                <h2 id="welcome">
                    Welcome, {props.store.user.username}!
                </h2>
                <p>Your ID is: {props.store.user.id}</p>

            </div>
        );
    }
}




export default DriverView;