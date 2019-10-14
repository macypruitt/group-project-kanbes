import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class StoreTableRow extends Component {
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
        let name = this.props.item.name;
        let address = this.props.item.address;
        let order = this.props.item.order;
        let status = this.props.item.status;
        let editOrSaveButton = <button onClick={this.clickEdit}>Edit</button>
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
        

        return (
            <tr>
                <td>{name}</td>
                <td>{address}</td>
                <td>{order}</td>
                <td>{status}</td>
                <td>
                    {editOrSaveButton}
                </td>
            </tr>
        );
    }
}

export default connect(mapStoreToProps)(StoreTableRow);
