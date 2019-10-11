import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

import UserTableRow from './UserTableRow';

class UserTable extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {

        const mockUserArray = [
            {
                first_name: "Shanice",
                last_name: "Gipson",
                email: "wahoo@yup.com",
                role: "boss",
                admin_level: "3"
            },
            {
                first_name: "Shanice",
                last_name: "Gipson",
                email: "wahoo@yup.com",
                role: "boss",
                admin_level: "3"
            },
            {
                first_name: "Shanice",
                last_name: "Gipson",
                email: "wahoo@yup.com",
                role: "boss",
                admin_level: "3"
            },
        ]

        let userTableData = mockUserArray.map((item, index) => {
            return (
                <UserTableRow 
                    key={index} 
                    item={item} />
            )
        })

        return (
            <div>
                <table className="admin-table">
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Admin level</th>
                        <th>Actions</th>
                    </tr>
                    {userTableData}
                </table>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(UserTable);
