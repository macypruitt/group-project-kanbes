import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, Input } from '@material-ui/core';

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
        }, () => {
            console.log(this.state)
        })
    }

    handleChangeInputText(event, dataKey) {
        const fieldValue = event.target.value;
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                [dataKey]: fieldValue
            }
        })
        console.log(this.state);
    }

    clickSave = (event) => {
        this.setState({
            isEditable: !this.state.isEditable
        })
        console.log(this.state)
        ////WILL BE PUT TO DATABASE ONCE CONNECTED TO SERVER
        this.props.dispatch({
            type: 'PUT_STORE',
            payload: {
                ...this.state.item
            }
        })
    }

    clickAdd = (event) => {
        this.props.clickAddStore();
        this.setState({
            isEditable: !this.state.isEditable,
            isAddable: !this.state.isAddable
        })
            
        ////WILL BE POSTED TO DATABASE ONCE CONNECTED TO SERVER
        this.props.dispatch({
            type: 'POST_STORE',
            payload: {
                ...this.state.item
            }
        })
    }

    clickCancelEdit = (event) => {
        this.setState({
            isEditable: false,
        })
    }

    render() {
        ////row data is passed to this component through props from StoreTable.js
        let name = this.props.item.name;
        let address = this.props.item.address;
        let order = this.props.item.delivery_route_order;
        let status = this.props.item.status
        if (this.props.item.status === true | this.props.item.status === false) {
            status = this.props.item.status.toString();
        }
        let contactEmail = this.props.item.contact_email;
        let contactName = this.props.item.contact_name;
        let contactPhone = this.props.item.contact_phone;
        let storePhone = this.props.item.store_phone_number;
        let editOrSaveButton = <Button onClick={this.clickEdit}>Edit</Button>

        console.log(status)
        ////if Edit button is clicked, text inputs appear and Edit button becomes Save button
        if (this.state.isEditable) {
            order = <Input className="row-input"
                placeholder={order}
                onChange={(event) => this.handleChangeInputText(event, 'delivery_route_order')} />
            name = <Input
                className="row-input"
                placeholder={name}
                onChange={(event) => this.handleChangeInputText(event, 'name')}
            />
            address = <Input className="row-input"
                placeholder={address}
                onChange={(event) => this.handleChangeInputText(event, 'address')} />
            status = <Input className="row-input"
                placeholder={status}
                onChange={(event) => this.handleChangeInputText(event, 'status')} />
            contactEmail = <Input className="row-input"
                placeholder={contactEmail}
                onChange={(event) => this.handleChangeInputText(event, 'contact_email')} />
            contactName = <Input className="row-input"
                placeholder={contactName}
                onChange={(event) => this.handleChangeInputText(event, 'contact_name')} />
            contactPhone = <Input className="row-input"
                placeholder={contactPhone}
                onChange={(event) => this.handleChangeInputText(event, 'contact_phone')} />
            storePhone = <Input className="row-input"
                placeholder={storePhone}
                onChange={(event) => this.handleChangeInputText(event, 'store_phone_number')} />
            editOrSaveButton = <div> <Button data-id={this.props.item.id} onClick={this.clickSave}>Save</Button>
                <Button onClick={this.clickCancelEdit}>Cancel</Button>
            </div>
        }

        ////if 'Add Store' button is clicked, Edit changes to Add
        if (this.state.isAddable) {
            editOrSaveButton = <Button data-id={this.props.item.id} onClick={this.clickAdd}>Add</Button>
        }


        return (
            <tr>
                <td>{order}</td>
                <td>{name}</td>
                <td>{address}</td>
                <td>{status}</td>
                <td>{contactName}</td>
                <td>{contactPhone}</td>
                <td>{contactEmail}</td>
                <td>{storePhone}</td>
                <td>{editOrSaveButton}</td>
            </tr>
        );
    }
}

export default connect(mapStoreToProps)(StoreTableRow);
