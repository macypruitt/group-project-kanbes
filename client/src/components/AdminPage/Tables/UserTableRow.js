import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, Input } from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});

class UserTableRow extends Component {
    state = {
        isEditable: this.props.editable || false,
        isAddable: this.props.addable || false,
        item: {}
    };

    clickEdit = (event) => {
        this.setState({
            isEditable: !this.state.isEditable,
            item: this.props.item
        }, ()=>{
            console.log(this.state)
        })
    }

    handleChangeInputText(event, dataKey) {
        const fieldValue = event.target.value;
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                [dataKey]:fieldValue}
        })
        console.log(this.state);
    }

    clickSave = (event) => {
        this.setState({
            isEditable: !this.state.isEditable
        })
        console.log(this.state)
        ////WILL BE PUT TO DATABASE ONCE CONNECTED TO SERVER
        this.props.dispatch({type: 'UPDATE_USER', 
            payload: {
                ...this.state.item
            }
        })
    }

    clickAdd = (event) => {
        this.props.clickAddUser();
        this.setState({
            isEditable: !this.state.isEditable,
            isAddable: !this.state.isAddable
        })
        console.log(this.state)
        ////WILL BE POSTED TO DATABASE ONCE CONNECTED TO SERVER
        this.props.dispatch({type: 'ADD_USER', 
            payload: {
                ...this.state.item
            }
        })
    }

    clickCancelEdit = event => {
        this.setState({
            isEditable: false,
        })
    }

    render() {
        const { classes, theme } = this.props;
         ////row data is passed to this component through props from UserTable.js
        let username = this.props.item.username;
        let password = this.props.item.password;
        let first_name = this.props.item.first_name;
        let last_name = this.props.item.last_name;
        let role = this.props.item.role;
        let email = this.props.item.email;
        let admin_level = this.props.item.admin_level;
        let editOrSaveButton = <Button className={classes.buttonPositive} onClick={this.clickEdit}>Edit</Button>

        if(this.state.isEditable){
            
            username = <Input 
                    className="row-input" 
                    placeholder={username}
                    onChange={(event) => this.handleChangeInputText(event, 'username')}
                    />
            password = <Input 
                    className="row-input" 
                    placeholder={password}
                    onChange={(event) => this.handleChangeInputText(event, 'password')}
                    />
            first_name = <Input 
                    className="row-input" 
                    placeholder={first_name}
                    onChange={(event) => this.handleChangeInputText(event, 'first_name')}
                     />
            last_name = <Input 
                    className="row-input" 
                    placeholder={last_name}
                    onChange={(event) => this.handleChangeInputText(event, 'last_name')}
                     />
            role = <Input className="row-input"
                        placeholder={role} 
                        onChange={(event) => this.handleChangeInputText(event, 'role')}/>
            email = <Input className="row-input" 
                        placeholder={email} 
                        onChange={(event) => this.handleChangeInputText(event, 'email')}/>
            admin_level = <Input className="row-input" 
                        placeholder={admin_level} 
                        onChange={(event) => this.handleChangeInputText(event, 'admin_level')}/>
            editOrSaveButton = <div><Button className={classes.buttonPositive} data-id={this.props.item.id} onClick={this.clickSave}>Save</Button>
                            <Button className={classes.buttonNegative} onClick={this.clickCancelEdit}>Cancel</Button>
                            </div>
        }

        ////if Add Store button is clicked
        if(this.state.isAddable){
            editOrSaveButton = <Button className={classes.buttonPositive} data-id={this.props.item.id} onClick={this.clickAdd}>Add</Button>
        }

        return (
            <tr>
                <td>{username}</td>
                <td>{password}</td>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{role}</td>
                <td>{email}</td>
                <td>{admin_level}</td>
                <td>{editOrSaveButton}</td>
                
            </tr>
        );
    }
}

UserTableRow.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default connect(mapStoreToProps)(
    withStyles(styles, { withTheme: true })(UserTableRow)
);