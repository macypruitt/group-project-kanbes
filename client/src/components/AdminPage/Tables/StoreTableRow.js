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


class StoreTableRow extends Component {


    state = {
        isEditable: this.props.editable || false,
        isAddable: this.props.addable || false,
        // editDeliveryOder: this.props.orderIsEditable || false,
        item: {},
        deliveryOrderArray: this.props.store.stores,
        status: '',
        labelWidth: 0
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
                [dataKey]: fieldValue,
            },
            [event.target.name]: event.target.value
        })
    }



    handleChangeDeliveryOrder(event, dataKey) {
        let storeArray = this.props.store.stores;
        const fieldValue = event.target.value;
        const placeholder = event.target.placeholder
        for (let i = 0; i < storeArray.length; i++) {
            if (storeArray[i].delivery_route_order == placeholder) {
                storeArray[i].delivery_route_order = fieldValue
            }
        }

        this.setState({
            ...this.state,
            deliveryOrderArray: storeArray,
            [event.target.name]: event.target.value
        })
        console.log(this.state);

        //dispatch to reducer that holds delivery route array globally and then dispatch that array from store table component on save
        this.props.dispatch({ type: 'UPDATE_DELIVERY_ORDER_ARRAY', payload: this.state.deliveryOrderArray })
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

        const { classes, theme } = this.props;
        ////row data is passed to this component through props from StoreTable.js
        let name = this.props.item.store_name;
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
        let editOrSaveButton = <Button className={classes.buttonPositive} onClick={this.clickEdit}>Edit</Button>

        if (this.props.store.editDeliveryOrderStatus) {
            order = <Input className="row-input"
                placeholder={order}
                onChange={(event) => this.handleChangeDeliveryOrder(event, 'delivery_route_order')} />
        }

        ////if Edit button is clicked, text inputs appear and Edit button becomes Save button
        if (this.state.isEditable) {

            name = <Input
                className="row-input"
                placeholder={name}
                onChange={(event) => this.handleChangeInputText(event, 'name')}
            />
            address = <Input className="row-input"
                placeholder={address}
                onChange={(event) => this.handleChangeInputText(event, 'address')} />
            status = <FormControl className={classes.formControl}>
                <InputLabel htmlFor="status">{status}</InputLabel>
                <Select
                    className="row-input"
                    onChange={(event) => this.handleChangeInputText(event, 'status')}
                    value={this.state.status}
                    inputProps={{
                        name: 'status',
                        id: 'status',
                    }}
                >
                    <MenuItem value={'true'}>True</MenuItem>
                    <MenuItem value={'false'}>False</MenuItem>
                </Select>
            </FormControl>
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
            editOrSaveButton = <div> <Button className={classes.buttonPositive} data-id={this.props.item.id} onClick={this.clickSave}>Save</Button>
                <Button className={classes.buttonNegative} onClick={this.clickCancelEdit}>Cancel</Button>
            </div>
        }

        ////if 'Add Store' button is clicked, Edit changes to Add
        if (this.state.isAddable) {
            editOrSaveButton = <Button className={classes.buttonPositive} data-id={this.props.item.id} onClick={this.clickAdd}>Add</Button>
            order = <Input className="row-input"
                placeholder={order}
                onChange={(event) => this.handleChangeInputText(event, 'delivery_route_order')} />
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

StoreTableRow.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default connect(mapStoreToProps)(
    withStyles(styles, { withTheme: true })(StoreTableRow)
);

