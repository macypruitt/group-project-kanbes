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
import { Done, Clear } from "@material-ui/icons";

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
        minWidth: 30
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});

class PricesTableRow extends Component {


    state = {
        isEditable: this.props.editable || false,
        isAddable: this.props.addable || false,
        item: {},
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
        console.log(this.state.item)
    }

    clickSave = (event) => {
        this.setState({
            isEditable: !this.state.isEditable
        })
        console.log(this.state)
        ////WILL BE PUT TO DATABASE ONCE CONNECTED TO SERVER
        this.props.dispatch({
            type: 'UPDATE_PRICE',
            payload: {
                ...this.state.item
            }
        })
    }

    clickAdd = (event) => {
        this.props.clickAddProduct();
        this.setState({
            isEditable: !this.state.isEditable,
            isAddable: !this.state.isAddable
        })

        ////WILL BE POSTED TO DATABASE ONCE CONNECTED TO SERVER
        this.props.dispatch({
            type: 'ADD_PRODUCT',
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
        ////styling for drop down check menu
        const iconStylesCheck = {
            color: "green"
          };
          const iconStylesX = {
            color: "red"
          };
        const { classes, theme } = this.props;

        ////row data is passed to this component through props from StoreTable.js
        let id = this.props.item.id
        let product_name = this.props.item.product_name;
        let product_sub_type = this.props.item.product_sub_type;
        let current_price_per_unit = this.props.item.current_price_per_unit;
        let status = this.props.item.status ? <Done style={iconStylesCheck} /> : <Clear style={iconStylesX} />
        let editOrSaveButton = <Button className={classes.buttonPositive} onClick={this.clickEdit}>Edit</Button>


        ////if Edit button is clicked, text inputs appear and Edit button becomes Save button
        if (this.state.isEditable) {

            current_price_per_unit = <Input
                className="product-select"
                placeholder={current_price_per_unit}
                onChange={(event) => this.handleChangeInputText(event, 'current_price_per_unit')}
            />
            status = <FormControl>
            <div>
            <Select
                className="iconDropdown"
                onChange={event => this.handleChangeInputText(event, "status")}
                value={this.state.status}
                inputProps={{
                name: "status",
                id: "status-select"
                }}
            >
                <MenuItem value={true}>
                <Done style={iconStylesCheck} />
                </MenuItem>
                <MenuItem value={false}>
                <Clear style={iconStylesX} />
                </MenuItem>
            </Select>
            </div>
        </FormControl>
            
            //<FormControl className={classes.formControl}>
                
            //     <Select
            //         className={classes.selectEmpty}
            //         // placeholder={(this.props.item.status).toString()}
            //         onChange={(event) => this.handleChangeInputText(event, 'status')}
            //         value={this.state.item.status}
            //         inputProps={{
            //             name: 'status',
            //             id: 'status',
            //         }}
            //     >
            //         <MenuItem value={'true'}>True</MenuItem>
            //         <MenuItem value={'false'}>False</MenuItem>
            //     </Select>
            // </FormControl>
            editOrSaveButton = <div> <Button className={classes.buttonPositive} data-id={this.props.item.id} onClick={this.clickSave}>Save</Button>
                <Button className={classes.buttonNegative} onClick={this.clickCancelEdit}>Cancel</Button>
            </div>
        }

        ////if 'Add Store' button is clicked, Edit changes to Add
        if (this.state.isAddable) {
            product_name = <Input
                className="row-input"
                placeholder={product_name}
                onChange={(event) => this.handleChangeInputText(event, 'product_name')}
            />

            product_sub_type = <Input
                className="row-input"
                placeholder={product_sub_type}
                onChange={(event) => this.handleChangeInputText(event, 'product_sub_type')}
            />

            current_price_per_unit = <Input
                className="row-input"
                placeholder={0}
                onChange={(event) => this.handleChangeInputText(event, 'current_price_per_unit')}
            />

            status = <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="status">{status}</InputLabel> */}
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

            editOrSaveButton = <Button className={classes.buttonPositive} data-id={this.props.item.id} onClick={this.clickAdd}>Add</Button>
        }

        return (
            <tr>
                <td className="product-col-width">{product_name}</td>
                <td className="product-col-width">{product_sub_type}</td>
                <td className="product-col-width">${current_price_per_unit}</td>
                <td className="product-col-width">{status}</td>
                <td className="product-col-width">{editOrSaveButton}</td>
            </tr>
        );
    }
}

PricesTableRow.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default connect(mapStoreToProps)(
    withStyles(styles, { withTheme: true })(PricesTableRow)
);

