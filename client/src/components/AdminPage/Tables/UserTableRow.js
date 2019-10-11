import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class UserTableRow extends Component {
    state = {
        isEditable: this.props.editable || false,
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
    }

    render() {

        let first_name = this.props.item.first_name;
        let last_name = this.props.item.last_name;
        let role = this.props.item.role;
        let email = this.props.item.email;
        let admin_level = this.props.item.status;
        let editOrSaveButton = <button onClick={this.clickEdit}>Edit</button>
        if(this.state.isEditable){
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

        return (
            <tr>
                <td>{first_name}</td>
                <td> {last_name}</td>
                <td>{role}</td>
                <td>{email}</td>
                <td>{admin_level}</td>
                <td>{editOrSaveButton}</td>
                
            </tr>
        );
    }
}

export default connect(mapStoreToProps)(UserTableRow);
