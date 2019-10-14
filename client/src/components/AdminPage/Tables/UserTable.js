import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

import UserTableRow from './UserTableRow';

class UserTable extends Component {
    state = {
        isAdding: false
    };

    clickAdd = (event) => {
        this.setState({
            ...this.state,
            isAdding: !this.state.isAdding
        })
    }

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

        let newRow;
        if(this.state.isAdding){
            const emptyItem = {}
            newRow = <UserTableRow editable={true} item={emptyItem} />
        }

        return (
            <div>
                <table className="admin-table">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Admin level</th>
                        <th>Actions</th>
                    </tr>
                    {userTableData}
                    {newRow}
                </table>
                <button onClick={this.clickAdd}>Add User</button>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(UserTable);
