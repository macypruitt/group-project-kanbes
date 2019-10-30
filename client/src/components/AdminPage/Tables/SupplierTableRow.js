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

class SupplierTableRow extends Component {
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
        this.props.dispatch({type: 'UPDATE_SUPPLIER', 
            payload: {
                ...this.state.item
            }
        })
    }

    clickAdd = (event) => {
        this.props.clickAddSupplier();
        this.setState({
            isEditable: !this.state.isEditable,
            isAddable: !this.state.isAddable
        })
        console.log(this.state)
        ////WILL BE POSTED TO DATABASE ONCE CONNECTED TO SERVER
        this.props.dispatch({type: 'ADD_SUPPLIER', 
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
        ////row data is passed to this component through props from SupplierTable.js
        let supplier_name = this.props.item.supplier_name;
        let contact_name = this.props.item.contact_name;
        let contact_number = this.props.item.contact_number;
        let address = this.props.item.address;
        let editOrSaveButton = <Button className={classes.buttonPositive} onClick={this.clickEdit}>Edit</Button>

        if(this.state.isEditable){
            supplier_name = <Input 
                    className="row-input" 
                    placeholder={supplier_name}
                    onChange={(event) => this.handleChangeInputText(event, 'supplier_name')}
                     />
            contact_name = <Input 
                    className="row-input" 
                    placeholder={contact_name}
                    onChange={(event) => this.handleChangeInputText(event, 'contact_name')}
                     />
            contact_number = <Input 
                    className="row-input" 
                    placeholder={contact_number}
                    onChange={(event) => this.handleChangeInputText(event, 'contact_number')}
                     />
            address = <Input className="row-input"
                        placeholder={address} 
                        onChange={(event) => this.handleChangeInputText(event, 'address')}/>
            
            editOrSaveButton = <div><Button className={classes.buttonPositive} data-id={this.props.item.id} onClick={this.clickSave}>Save</Button>
                            <Button className={classes.buttonNegative} onClick={this.clickCancelEdit}>Cancel</Button>
                            </div>
        }
        
        ////if Add Store button is clicked
        if(this.state.isAddable){
            editOrSaveButton = <Button className={classes.buttonPositive} data-id={this.props.item.id} onClick={this.clickAdd}>Add</Button>
        }

        ////formatting phone number
        if (contact_number && contact_number.length == 10){
            const phonePtOne = contact_number.slice(0,3)
            const phonePtTwo = contact_number.slice(3,6)
            const phonePtThree = contact_number.slice(6,10)
            contact_number = `(${phonePtOne})${phonePtTwo}-${phonePtThree}`;
        }
        
        return (
            <tr>
                <td className="five-col-width">{supplier_name}</td>
                <td className="five-col-width">{contact_name}</td>
                <td className="five-col-width">{contact_number}</td>
                <td className="five-col-width">{address}</td>
                <td className="five-col-width">{editOrSaveButton}</td>
                
            </tr>
        );
    }
}


SupplierTableRow.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default connect(mapStoreToProps)(
    withStyles(styles, { withTheme: true })(SupplierTableRow)
);