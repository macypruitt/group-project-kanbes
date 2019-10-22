import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import PropTypes from "prop-types";


const styles = theme => ({
    buttonEdit: {
        margin: 2,
        color: 'blue'
        //   backgroundColor: 'whitesmoke'
    },
    buttonNegative: {
        margin: 2,
        color: 'red'
        //   backgroundColor: 'whitesmoke'
    },
    buttonPositive: {
        margin: 2,
        color: 'blue'
        //   backgroundColor: 'whitesmoke'
    },
    buttonNew: {
        margin: 2,
        color: 'green'
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


var today = new Date();
var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
var time = "T" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var currentDateTime = date + time

class DriverTableRow extends Component {
    state = {
        isEditable: this.props.editable || false,
        isAddable: this.props.addable || false,
        isUpdatable: this.props.updatable || false,
        currentTimeStamp: currentDateTime,
        item: {}
    };

    clickEdit = (event) => {
        this.setState({
            ...this.state,
            isEditable: !this.state.isEditable,
            item: {
                ...this.props.item,
                last_modified: this.state.currentTimeStamp
            }
        }, () => {
            console.log(this.state)
        })
    }

    clickUpdate = (event) => {
        this.setState({
            ...this.state,
            isEditable: !this.state.isEditable,
            isUpdatable: !this.state.isUpdatable,
            item: {
                ...this.props.item,
                last_modified: this.state.currentTimeStamp
            }
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

    clickSaveEntry = (event) => {
        this.setState({
            isEditable: !this.state.isEditable
        })
        console.log(this.state)
        ////WILL BE SENT TO DATABASE ONCE CONNECTED TO SERVER
        this.props.dispatch({ type: "ADD_OUTGOING_STORE", payload: this.state.item })
    }

    clickSaveUpdate = (event) => {
        this.setState({
            isEditable: false,
            isUpdatable: false
        })
        console.log(this.state)
        ////WILL BE SENT TO DATABASE ONCE CONNECTED TO SERVER
        this.props.dispatch({ type: "UPDATE_OUTGOING_STORE", payload: this.state.item })
    }

    clickAddEntry = (event) => {
        this.props.clickAddStore();
        this.setState({
            isEditable: !this.state.isEditable,
            isAddable: !this.state.isAddable
        })
        console.log(this.state)
        ////WILL BE POSTED TO DATABASE ONCE CONNECTED TO SERVER
    }

    clickCancelEdit = event => {
        this.setState({
            isEditable: false,
            isAddable: false
        })
    }

    clickCancelUpdate= event => {
        this.setState({
            isEditable: false,
        isAddable: false,
        isUpdatable:  false
        })
    }

    render() {
        const { classes, theme } = this.props;

        ////row data is passed to this component via props
        let product_name = this.props.item.product_name;
        let product_sub_type = this.props.item.product_sub_type;
        let standard_par = this.props.item.standard_par;
        let last_par = this.props.item.last_par;
        let sold = this.props.item.sold_product_count;
        let shrink = this.props.item.shrink_product_count;
        let notes = this.props.item.notes;
        let lastModified = '';
        if(this.props.item.last_modified) {
            lastModified = this.props.item.last_modified;
        }
        // let restocked = this.props.item.
        let editOrSaveButton = <Button className={classes.buttonEdit} onClick={this.clickUpdate}>Edit Entry</Button>;
        let today = new Date();
        let date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
        let time = "T" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let currentDateTime = date + time

        if ((lastModified.split("T")[0]).split("-")[2] != today.getDate()) {
            console.log((lastModified.split("T")[0]).split("-")[2]);
            sold = '';
            shrink = '';
            notes = '';
            lastModified = 'No Entry Yet Today';
            editOrSaveButton = <Button  className={classes.buttonNew} onClick={this.clickEdit}>New Entry</Button>;
        }


        ////if Edit button is clicked, text inputs appear and Edit button becomes Save button
        if (this.state.isEditable) {
            // product_name = <input 
            //         className="row-input" 
            //         placeholder={product_name}
            //         onChange={(event) => this.handleChangeInputText(event, 'product_name')}
            //          />
            // product_sub_type = <input 

            //         className="row-input" 
            //         placeholder={product_sub_type}
            //         onChange={(event) => this.handleChangeInputText(event, 'product_sub_type')}
            //          />
            standard_par = <input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                placeholder={standard_par}
                onChange={(event) => this.handleChangeInputText(event, 'standard_par')}
            />
            last_par = <input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                placeholder={last_par}
                onChange={(event) => this.handleChangeInputText(event, 'last_par')}
            />
            sold = <input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                onChange={(event) => this.handleChangeInputText(event, 'sold_product_count')}
            />
            shrink = <input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                onChange={(event) => this.handleChangeInputText(event, 'shrink_product_count')}
            />
            notes = <input
                type="text"
                className="row-input"
                onChange={(event) => this.handleChangeInputText(event, 'notes')}
            />
            lastModified = date + time


            editOrSaveButton = 
            <div><Button className={classes.buttonPositive} data-id={this.props.item.id} onClick={this.clickSaveEntry}>Save New Entry</Button>
                <Button className={classes.buttonNegative} onClick={this.clickCancelEdit}>Cancel</Button>
            </div>
        }

        ////if 'Add Store' button is clicked, Edit changes to Add
        if (this.state.isAddable) {
            editOrSaveButton = '';
            // <div><Button className={classes.buttonPositive} data-id={this.props.item.id} onClick={this.clickAddEntry}>Add Entry</Button>
            //     <Button className={classes.buttonNegative} onClick={this.clickCancelEdit}>Cancel</Button>
            // </div>
            product_name = <input
                className="row-input"
                placeholder={product_name}
                onChange={(event) => this.handleChangeInputText(event, 'product_name')}
            />
            product_sub_type = <input

                className="row-input"
                placeholder={product_sub_type}
                onChange={(event) => this.handleChangeInputText(event, 'product_sub_type')}
            />
            lastModified = date + time
        }

        if (this.state.isUpdatable) {
            editOrSaveButton = 
            <div><Button className={classes.buttonPositive} data-id={this.props.item.id} onClick={this.clickSaveUpdate}>Save Update</Button>
                <Button className={classes.buttonNegative} onClick={this.clickCancelUpdate}>Cancel</Button>
            </div>
            sold = <input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                placeholder={this.props.item.sold_product_count}
                onChange={(event) => this.handleChangeInputText(event, 'sold_product_count')}
            />
            shrink = <input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                placeholder={this.props.item.shrink_product_count}
                onChange={(event) => this.handleChangeInputText(event, 'shrink_product_count')}
            />
            notes = <input
                type="text"
                className="row-input"
                placeholder={this.props.item.notes}
                onChange={(event) => this.handleChangeInputText(event, 'notes')}
            />
        }

        return (

            <tr id={this.props.key}>
                <td>{product_name}</td>
                <td>{product_sub_type}</td>
                <td>{standard_par}</td>
                <td>{last_par}</td>
                <td>{sold}</td>
                <td>{shrink}</td>
                <td>test</td>
                <td>{notes}</td>
                <td>{lastModified}</td>
                <td>{editOrSaveButton}</td>
            </tr>
        );
    }
}


DriverTableRow.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default connect(mapStoreToProps)(
    withStyles(styles, { withTheme: true })(DriverTableRow)
);
