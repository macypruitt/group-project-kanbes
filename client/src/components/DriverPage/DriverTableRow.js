import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import PropTypes from "prop-types";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withRouter } from 'react-router';


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

    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            ...this.props,
            previousRestock: props.item.product_count,
            isEditable: props.editable || false,
            isAddable: props.addable || false,
            isUpdatable: props.updatable || false,
            currentTimeStamp: currentDateTime,
            product_name: '',
            product_sub_type: '',
            supplier: '',
            values: {
                name: '',
                id: ''
            },
            defaultStateItem: {},
            savedLastPar: ''
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PRODUCTS' });
        this.props.dispatch({ type: 'FETCH_SUPPLIERS' });
        this.calcLastPar();
    }

    // baseLastPar = parseInt(this.state.item.last_par);


    clickEdit = (event) => {
        this.setState({
            ...this.state,
            isEditable: !this.state.isEditable,
            item: {
                ...this.state.item,
                last_modified: this.state.currentTimeStamp
            },
            savedLastPar: this.state.last_par
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
                ...this.state.item,
                last_modified: this.state.currentTimeStamp
            }
        }, () => {
            console.log(this.state)
        })
    }

    handleChangeInputText(event, dataKey) {
        if (dataKey === 'sold_product_count' || dataKey === 'shrink_product_count' || dataKey === 'product_count') {
            let newValue;

            if (event.target.value === '') {
                newValue = 0;
            } else {
                newValue = parseInt(event.target.value)
            }

            this.setState({
                ...this.state,
                item: {
                    ...this.state.item,
                    [dataKey]: parseInt(newValue)
                }
            }, () => {
                this.calcLastPar();
            })
        }
        else {

            this.setState({
                ...this.state,
                item: {
                    ...this.state.item,
                    [dataKey]: event.target.value
                }
            })
        }
    }

    calcLastPar() {
        console.log('last par', this.state.item.last_par)
        console.log('sold',this.state.item.sold_product_count )
        console.log('shrink', this.state.item.shrink_product_count)
        console.log('product count', this.state.item.product_count)
        console.log('this.state.previousRestock: ', this.state.previousRestock);
        
        const newLastPar = this.state.previousRestock - (this.state.item.sold_product_count + this.state.item.shrink_product_count) + this.state.item.product_count;
        console.log(newLastPar);        

        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                last_par: newLastPar
            }
        },()=>{
            console.log('HERE: ', this.state)
        })
    }

    setValues = (value) => {
        this.setState({
            ...this.state,
            values: {
                name: value
            }
        })
    }

    handleChangeProductName(event) {
        this.setValues(event.target.value);
        this.setState({
            ...this.state,
            product_name: event.target.value,
            item: {
                ...this.state.item,
                product_name: event.target.value.product_name,
                product_id: event.target.value.product_id,
                current_price_per_unit: event.target.value.current_price_per_unit,
                current_price_per_unit_id: event.target.value.id,
                sold_price_per_unit: event.target.value.current_price_per_unit,

            }
        })

    }

    handleChangeSupplierName(event) {
        this.setValues(event.target.value);
        console.log(event.target)
        this.setState({
            ...this.state,
            supplier: event.target.value,
            item: {
                ...this.state.item,
                supplier_id: event.target.value.id,
                supplier_name: event.target.value.supplier_name
            }
        })
    }

    handleChangeProductSubType(event) {
        this.setValues(event.target.value);
        console.log(event.target)
        this.setState({
            ...this.state,
            product_sub_type: event.target.value,
            item: {
                ...this.state.item,
                product_sub_type: event.target.value.product_sub_type
            }
        })

    }

    clickSaveEntry = (event) => {
        this.setState({
            isEditable: !this.state.isEditable
        })
        ////WILL BE SENT TO DATABASE ONCE CONNECTED TO SERVER
        // this.props.dispatch({ type: "ADD_OUTGOING_STORE", payload: this.state.item })
        this.props.dispatch({ type: "ADD_INCOMING_STORE", payload: this.state.item })
    }

    clickSaveUpdate = (event) => {
        this.setState({
            isEditable: false,
            isUpdatable: false
        })
        ////WILL BE SENT TO DATABASE ONCE CONNECTED TO SERVER
        this.props.dispatch({ type: "UPDATE_OUTGOING_STORE", payload: this.state.item })
        this.props.dispatch({ type: "UPDATE_INCOMING_STORE", payload: this.state.item })
    }


    clickCancelEdit = event => {
        this.setState({
            isEditable: false,
            isAddable: false
        })
    }

    clickCancelUpdate = event => {
        this.setState({
            isEditable: false,
            isAddable: false,
            isUpdatable: false
        })
    }

    clickSaveNewProduct = event => {

        this.setState({
            ...this.state,

            item: {
                ...this.state.item,
                last_modified: this.state.currentTimeStamp,
                user_id: this.props.store.user.id,
                store_id: this.props.match.params.id
            }
        }, () => {
            console.log('state at save new product', this.state)
            //     ////WILL BE POSTED TO DATABASE ONCE CONNECTED TO SERVER
            this.props.dispatch({ type: "ADD_INCOMING_STORE", payload: this.state.item })
            this.props.clickAddProduct();
        })

    }

    render() {
        let activeProducts = [];
        let activeProductSubTypes = [];
        activeProductSubTypes = this.props.store.activeProducts;
        activeProducts = this.props.store.activeProducts;
        if (activeProducts.length > 0) {
            activeProducts = activeProducts.map((item, index) => {
                return <MenuItem key={index} value={item}>{item.product_name}</MenuItem>
            })
        }

        if (activeProducts.length > 0 && this.state.item.product_id) {

            activeProductSubTypes = activeProductSubTypes.map((item, index) => {
                if (item.product_id === this.state.item.product_id) {
                    return <MenuItem key={index} value={item}>{item.product_sub_type}</MenuItem>
                }
            })
        } else {
            activeProductSubTypes = activeProductSubTypes.map((item, index) => {
                return <MenuItem key={index} value={item}>{item.product_sub_type}</MenuItem>
            })
        }


        let suppliers = [];
        suppliers = this.props.store.suppliers
        if (suppliers.length > 0) {
            suppliers = suppliers.map((item, index) => {
                return <MenuItem key={index} value={item}>{item.supplier_name}</MenuItem>
            })
        }


        const { classes, theme } = this.props;

        ////row data is passed to this component via props
        let product_name = this.props.item.product_name;
        let product_sub_type = this.props.item.product_sub_type;
        let supplier = this.props.item.supplier_name
        let standard_par = this.props.item.standard_par;
        let last_par = this.props.item.last_par;
        let sold = this.props.item.sold_product_count;
        let shrink = this.props.item.shrink_product_count;
        let notes = this.props.item.notes;
        let lastModified = '';
        if (this.props.item.last_modified) {
            lastModified = this.props.item.last_modified;
        }
        let restocked = this.props.item.product_count;
        let editOrSaveButton = <Button className={classes.buttonEdit} onClick={this.clickUpdate}>Edit Entry</Button>;
        let today = new Date();
        let date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
        let time = "T" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let currentDateTime = date + time

        if ((lastModified.split("T")[0]).split("-")[2] != today.getDate()) {
            sold = '';
            shrink = '';
            restocked = '';
            notes = '';
            lastModified = 'No Entry Yet Today';
            editOrSaveButton = <Button className={classes.buttonNew} onClick={this.clickEdit}>New Entry</Button>;
        }


        ////if Edit button is clicked, text inputs appear and Edit button becomes Save button
        if (this.state.isEditable) {

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
                placeholder={this.state.item.last_par}
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
            restocked = <input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                placeholder={this.props.item.product_count}
                onChange={(event) => this.handleChangeInputText(event, 'product_count')}
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
            editOrSaveButton = <Button className={classes.buttonPositive} data-id={this.props.item.id} onClick={this.clickSaveNewProduct}>Save New Product</Button>;


            product_name = <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="product_name">{product_name}</InputLabel> */}
                <Select
                    className="row-input"
                    // placeholder={product_name}
                    onChange={(event) => this.handleChangeProductName(event, 'product_name')}
                    value={this.state.product_name}
                    inputProps={{
                        name: 'product_name',
                        id: 'product_name',
                    }}
                >
                    {activeProducts}
                </Select>
            </FormControl>

            product_sub_type = <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="product_sub_type">{product_sub_type}</InputLabel> */}
                <Select
                    className="row-input"
                    onChange={(event) => this.handleChangeProductSubType(event, 'product_sub_type')}
                    value={this.state.product_sub_type}
                    inputProps={{
                        name: 'product_sub_type',
                        id: 'product_sub_type',
                    }}
                >
                    {activeProductSubTypes}
                </Select>
            </FormControl>

            supplier = <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="supplier">{product_sub_type}</InputLabel> */}
                <Select
                    className="row-input"
                    onChange={(event) => this.handleChangeSupplierName(event, 'supplier')}
                    value={this.state.supplier}
                    inputProps={{
                        name: 'supplier',
                        id: 'supplier',
                    }}
                >
                    {suppliers}
                </Select>
            </FormControl>
            lastModified = date + time
        }

        if (this.state.isUpdatable) {
            editOrSaveButton =
                <div><Button className={classes.buttonPositive} data-id={this.props.item.id} onClick={this.clickSaveUpdate}>Save Update</Button>
                    <Button className={classes.buttonNegative} onClick={this.clickCancelUpdate}>Cancel</Button>
                </div>
            sold = <input
                type="number"
                pattern="[0-9]*"
                className="row-input"
                placeholder={this.props.item.sold_product_count}
                onChange={(event) => this.handleChangeInputText(event, 'sold_product_count')}
            />
            shrink = <input
            type="number"
                pattern="[0-9]*"
                className="row-input"
                placeholder={this.props.item.shrink_product_count}
                onChange={(event) => this.handleChangeInputText(event, 'shrink_product_count')}
            />
            restocked = <input
                type="number"
                pattern="[0-9]*"
                className="row-input"
                placeholder={this.props.item.product_count}
                onChange={(event) => this.handleChangeInputText(event, 'product_count')}
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
                <td>{supplier}</td>
                <td>{standard_par}</td>
                <td>{last_par}</td>
                <td>{sold}</td>
                <td>{shrink}</td>
                <td>{restocked}</td>
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
    withStyles(styles, { withTheme: true })(withRouter(DriverTableRow))
);
