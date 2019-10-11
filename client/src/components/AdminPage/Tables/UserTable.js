import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace 
// the component name TemplateClass with the name for the new 
// component.
class UserTable extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {
        return (
            <div>
                <table className="admin-table">
                    <tr>
                        <th>Store name</th>
                        <th>Address</th>
                        <th>Order #</th>
                        <th>Actions</th>
                    </tr>

                </table>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(UserTable);
