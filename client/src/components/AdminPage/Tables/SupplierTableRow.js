import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class SupplierTableRow extends Component {
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
        let contact_name = this.props.item.contact_name;
        let contact_number = this.props.item.contact_number;
        let address = this.props.item.address;
        let editOrSaveButton = <button onClick={this.clickEdit}>Edit</button>
        if(this.state.isEditable){
            name = <input 
                    className="row-input" 
                    placeholder={name}
                    onChange={(event) => this.handleChangeInputText(event, 'name')}
                     />
            contact_name = <input 
                    className="row-input" 
                    placeholder={contact_name}
                    onChange={(event) => this.handleChangeInputText(event, 'contact_name')}
                     />
            contact_number = <input 
                    className="row-input" 
                    placeholder={contact_number}
                    onChange={(event) => this.handleChangeInputText(event, 'contact_name')}
                     />
            address = <input className="row-input"
                        placeholder={address} 
                        onChange={(event) => this.handleChangeInputText(event, 'address')}/>
            
            editOrSaveButton = <button data-id={this.props.item.id} onClick={this.clickSave}>Save</button>
        }
        
        return (
            <tr>
                <td>{name}</td>
                <td>{contact_name}</td>
                <td>{contact_number}</td>
                <td>{address}</td>
                <td>{editOrSaveButton}</td>
                
            </tr>
        );
    }
}

export default connect(mapStoreToProps)(SupplierTableRow);
