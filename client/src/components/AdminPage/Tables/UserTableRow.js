import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class UserTableRow extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {
        return (
            <tr>
                <td>{this.props.item.first_name} {this.props.item.last_name}</td>
                <td>{this.props.item.role}</td>
                <td>{this.props.item.email}</td>
                <td>{this.props.item.admin_level}</td>
                <td><button>Edit</button></td>
                
            </tr>
        );
    }
}

export default connect(mapStoreToProps)(UserTableRow);
