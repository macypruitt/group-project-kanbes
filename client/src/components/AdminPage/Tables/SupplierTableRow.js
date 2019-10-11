import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class SupplierTableRow extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.contact_name}</td>
                <td>{this.props.item.contact_number}</td>
                <td>{this.props.item.address}</td>
                <td><button>Edit</button></td>
                
            </tr>
        );
    }
}

export default connect(mapStoreToProps)(SupplierTableRow);
