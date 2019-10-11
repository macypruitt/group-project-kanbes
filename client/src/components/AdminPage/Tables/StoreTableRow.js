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
                <td>Edit</td>
                
            </tr>
        );
    }
}

export default connect(mapStoreToProps)(StoreTableRow);
