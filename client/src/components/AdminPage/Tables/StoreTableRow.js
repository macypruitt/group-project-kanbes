import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class StoreTableRow extends Component {
    state = {
        isEditable: this.props.editable || false,
        isAddable: this.props.addable || false,
        item: {}
    };
    
    clickEdit = (event) => {
        this.setState({
            ...this.state,
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

    clickAdd = (event) => {
        this.setState({
            isEditable: !this.state.isEditable,
            isAddable: !this.state.isAddable
        })
        console.log(this.state)
        ////WILL BE POSTED TO DATABASE ONCE CONNECTED TO SERVER
    }

    render() {
        ////row data is passed to this component through props from StoreTable.js
        let name = this.props.item.name;
        let address = this.props.item.address;
        let order = this.props.item.order;
        let status = this.props.item.status;
        let editOrSaveButton = <button onClick={this.clickEdit}>Edit</button>
        
        ////if Edit button is clicked, text inputs appear and Edit button becomes Save button
        if(this.state.isEditable){
            name = <input 
                    className="row-input" 
                    placeholder={name}
                    onChange={(event) => this.handleChangeInputText(event, 'name')}
                     />
            address = <input className="row-input"
                        placeholder={address} 
                        onChange={(event) => this.handleChangeInputText(event, 'address')}/>
            order = <input className="row-input" 
                        placeholder={order} 
                        onChange={(event) => this.handleChangeInputText(event, 'order')}/>
            status = <input className="row-input" 
                        placeholder={status} 
                        onChange={(event) => this.handleChangeInputText(event, 'status')}/>
            editOrSaveButton = <button data-id={this.props.item.id} onClick={this.clickSave}>Save</button>
        }

        ////if 'Add Store' button is clicked, Edit changes to Add
        if(this.state.isAddable){
            editOrSaveButton = <button data-id={this.props.item.id} onClick={this.clickAdd}>Add</button>
        }
        

        return (
            <tr>
                <td>{name}</td>
                <td>{address}</td>
                <td>{order}</td>
                <td>{status}</td>
                <td>{editOrSaveButton}</td>
            </tr>
        );
    }
}

export default connect(mapStoreToProps)(StoreTableRow);