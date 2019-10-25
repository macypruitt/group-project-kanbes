import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import UserTableRow from './UserTableRow';

const styles = theme => ({
    buttonPositive: {
        margin: 2,
        color: 'blue'
        //   backgroundColor: 'whitesmoke'
    },
    buttonNegative: {
        margin: 2,
        color: 'red'
        //   backgroundColor: 'whitesmoke'
    },
    input: {
        display: 'none',
    }
});

class UserTable extends Component {
componentDidMount() {
    this.props.dispatch({type: 'FETCH_USERS' })
}


    state = {
        isAdding: false
    };

    clickAddUser = (event) => {
        this.setState({
            ...this.state,
            isAdding: !this.state.isAdding
        })
    }

    clickAddCancel = (event) => {
        this.setState({
            ...this.state,
            isAdding: false
        })
    }

    render() {
        const { classes, theme } = this.props;
        const usersArray = this.props.store.users;


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
        let addOrCancelButton = <div>
        <Button className={classes.buttonPositive} onClick={this.clickAddUser}>Add User</Button>
        
        </div>
        if(this.state.isAdding){
            const emptyItem = {}
            newRow = <UserTableRow clickAddUser={this.clickAddUser} editable={true} addable={true} item={emptyItem} />
            addOrCancelButton = <Button className={classes.buttonNegative} onClick={this.clickAddCancel}>Cancel</Button>
        }

        return (
            <div className="tableFixedHead">
                {/* First table generates the table head */}
                <div className="tableFixedHead-hd">
                <table className="baseTable">
                    <thead>
                        <tr>
                            <th className="seven-col-width">Username</th>
                            <th className="seven-col-width">First Name</th>
                            <th className="seven-col-width">Last Name</th>
                            <th className="seven-col-width">Role</th>
                            <th className="seven-col-width">Email</th>
                            <th className="seven-col-width">Admin level</th>
                            <th className="seven-col-width">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userTableData}
                        {newRow}
                    </tbody>
                </table>
                </div>
                {/* Second table generates the table body */}
                <div  className="tableFixedHead-scroll">
                <table className="baseTable rows">
                    <thead>
                        <tr>
                            <th className="seven-col-width">Username</th>
                            <th className="seven-col-width">First Name</th>
                            <th className="seven-col-width">Last Name</th>
                            <th className="seven-col-width">Role</th>
                            <th className="seven-col-width">Email</th>
                            <th className="seven-col-width">Admin level</th>
                            <th className="seven-col-width">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userTableData}
                        {newRow}
                    </tbody>
                </table>
                </div>












                {addOrCancelButton}








            </div>
        );
    }
}

UserTable.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default connect(mapStoreToProps)(
    withStyles(styles, { withTheme: true })(UserTable)
);