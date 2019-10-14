import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

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

    render() {
         ////row data is passed to this component through props from UserTable.js
        let username = this.props.item.username;
        let password = this.props.item.password;
        let first_name = this.props.item.first_name;
        let last_name = this.props.item.last_name;
        let role = this.props.item.role;
        let email = this.props.item.email;
        let admin_level = this.props.item.admin_level;
        let editOrSaveButton = <button onClick={this.clickEdit}>Edit</button>

        if(this.state.isEditable){
            
            username = <input 
                    className="row-input" 
                    placeholder={username}
                    onChange={(event) => this.handleChangeInputText(event, 'username')}
                    />
            password = <input 
                    className="row-input" 
                    placeholder={password}
                    onChange={(event) => this.handleChangeInputText(event, 'password')}
                    />
            first_name = <input 
                    className="row-input" 
                    placeholder={first_name}
                    onChange={(event) => this.handleChangeInputText(event, 'first_name')}
                     />
            last_name = <input 
                    className="row-input" 
                    placeholder={last_name}
                    onChange={(event) => this.handleChangeInputText(event, 'last_name')}
                     />
            role = <input className="row-input"
                        placeholder={role} 
                        onChange={(event) => this.handleChangeInputText(event, 'role')}/>
            email = <input className="row-input" 
                        placeholder={email} 
                        onChange={(event) => this.handleChangeInputText(event, 'email')}/>
            admin_level = <input className="row-input" 
                        placeholder={admin_level} 
                        onChange={(event) => this.handleChangeInputText(event, 'admin_level')}/>
            editOrSaveButton = <button data-id={this.props.item.id} onClick={this.clickSave}>Save</button>
        }

        ////if Add Store button is clicked
        if(this.state.isAddable){
            editOrSaveButton = <button data-id={this.props.item.id} onClick={this.clickAdd}>Add</button>
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

export default connect(mapStoreToProps)(UserTableRow);
