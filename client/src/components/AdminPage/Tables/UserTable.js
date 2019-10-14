import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

import UserTableRow from './UserTableRow';

class UserTable extends Component {
componentDidMount() {
    this.props.dispatch({type: 'FETCH_USERS' })
}


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

const usersArray = this.props.store.users


        // const mockUserArray = [
        //     {
        //         first_name: "Shanice",
        //         last_name: "Gipson",
        //         email: "wahoo@yup.com",
        //         role: "boss",
        //         admin_level: "3"
        //     },
        //     {
        //         first_name: "Shanice",
        //         last_name: "Gipson",
        //         email: "wahoo@yup.com",
        //         role: "boss",
        //         admin_level: "3"
        //     },
        //     {
        //         first_name: "Shanice",
        //         last_name: "Gipson",
        //         email: "wahoo@yup.com",
        //         role: "boss",
        //         admin_level: "3"
        //     },
        // ]

        let userTableData = usersArray.map((item, index) => {
            return (
                <UserTableRow 
                    key={index} 
                    item={item} />
            )
        })

        ////a new row is added when the 'Add User' button is clicked
        let newRow;
        if(this.state.isAdding){
            const emptyItem = {}
            newRow = <UserTableRow editable={true} addable={true} item={emptyItem} />
        }

        return (
            <div>
                <table className="admin-table">
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
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
