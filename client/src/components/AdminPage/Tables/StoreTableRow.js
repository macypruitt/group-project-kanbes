import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class StoreTableRow extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.address}</td>
                <td>{this.props.item.order}</td>
                <td>{this.props.item.status}</td>
                <td><button>Edit</button></td>
            </tr>
        );
    }
}

export default connect(mapStoreToProps)(StoreTableRow);
