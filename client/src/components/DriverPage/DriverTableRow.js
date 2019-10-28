import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import PropTypes from "prop-types";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withRouter } from 'react-router';
import { Edit, Done, Clear } from "@material-ui/icons";


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
        console.log(this.state);
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
                last_modified: this.state.currentTimeStamp,
                last_par: this.props.item.last_par,
            },
            savedLastPar: this.state.item.last_par
        }, () => {

            console.log('STATE WHEN NEW ENTRY IS CLICKED: ', this.state)
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
            console.log('STATE WHEN clickUpdate is clicked:', this.state)
        })
    }

    handleChangeInputText(event, dataKey) {
        console.log(dataKey);
        
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
        console.log('this.state.previousRestock: ', this.props.item.product_count);
        
        const newLastPar = this.props.item.product_count - (this.state.item.sold_product_count + this.state.item.shrink_product_count) + this.state.item.product_count;
        console.log('newLastPar: ', newLastPar);        
// if(parseFloat(newLastPar) <0 ){
//     newLastPar = 0
// }
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                last_par: newLastPar
            }
        },()=>{
            console.log('CALCLASTPAR STATE: ', this.state)
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
            isAddable: false,
            item: {
                ...this.props.item
                // ...this.state.item,
                // last_par: this.props.item.last_par
            }
            
        }, () => {
            console.log('STATE WHEN CANCEL EDIT IS CLICKED: ', this.state);
        })
    }

    clickCancelUpdate = event => {
        this.setState({
            isEditable: false,
            isAddable: false,
            isUpdatable: false,
            item: {
                ...this.props.item
                // ...this.state.item,
                // last_par: this.props.item.last_par
            }
        }, () => {
            console.log('STATE WHEN CANCEL UPDATE IS CLICKED: ', this.state)
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

        ////activeProducts and activeProductSubTypes will display all available options of products
        let activeProducts = [];
        let activeProductSubTypes = [];
        
        ////their values come from the reducer
        activeProducts = this.props.store.activeProducts;
        activeProductSubTypes = this.props.store.activeProducts;

        ////creating a new array with only the names of products
        let nameOfActiveProducts = activeProducts.map((item, index) => {
            return item.product_name
        })

        ////removing duplicate product types
        const productsNoDuplicates = [...new Set(nameOfActiveProducts)];

        ////creating drop-down for product
        if (activeProducts.length > 0) {
            activeProducts = productsNoDuplicates.map((item, index) => {
                return <MenuItem key={index} value={item}>{item}</MenuItem>
            })
        }

        ////creating drop-down for sub-type
        if (activeProducts.length > 0 && this.state.item.product_id) {
            ////if there is already a entry
            activeProductSubTypes = activeProductSubTypes.map((item, index) => {
                if (item.product_id === this.state.item.product_id) {
                    return <MenuItem key={index} value={item}>{item.product_sub_type}</MenuItem>
                }
            })
        } else {
            ////for a new row
            activeProductSubTypes = activeProductSubTypes.filter((item, index) => {
                ////filtering sub-type according to product
                return  item.product_name == this.state.product_name;
            })
            ////generating drop-down for filtered sub-types
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
            editOrSaveButton = <Button className={classes.buttonNew} onClick={this.clickEdit}><Edit /></Button>;
        }


        ////if Edit button is clicked, text inputs appear and Edit button becomes Save button
        if (this.state.isEditable) {

            standard_par = <Input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                placeholder={standard_par}
                onChange={(event) => this.handleChangeInputText(event, 'standard_par')}
            />

            last_par = <Input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                placeholder={this.state.item.last_par}
                onChange={(event) => this.handleChangeInputText(event, 'last_par')}
            />
            sold = <Input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                onChange={(event) => this.handleChangeInputText(event, 'sold_product_count')}
            />
            shrink = <Input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                onChange={(event) => this.handleChangeInputText(event, 'shrink_product_count')}
            />
            restocked = <Input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                placeholder={this.props.item.product_count}
                onChange={(event) => this.handleChangeInputText(event, 'product_count')}
            />
            notes = <Input
                type="text"
                className="row-input"
                onChange={(event) => this.handleChangeInputText(event, 'notes')}
            />
            lastModified = date + time;


            editOrSaveButton =
                <div><Button className={classes.buttonPositive} data-id={this.props.item.id} onClick={this.clickSaveEntry}><Done /></Button>
                    <Button className={classes.buttonNegative} onClick={this.clickCancelEdit}><Clear /></Button>
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
            sold = <Input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                placeholder={this.props.item.sold_product_count}
                onChange={(event) => this.handleChangeInputText(event, 'sold_product_count')}
            />
            shrink = <Input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                placeholder={this.props.item.shrink_product_count}
                onChange={(event) => this.handleChangeInputText(event, 'shrink_product_count')}
            />
            restocked = <Input
                type="tel"
                pattern="[0-9]*"
                className="row-input"
                placeholder={this.props.item.product_count}
                onChange={(event) => this.handleChangeInputText(event, 'product_count')}
            />
            notes = <Input
                type="text"
                className="row-input"
                placeholder={this.props.item.notes}
                onChange={(event) => this.handleChangeInputText(event, 'notes')}
            />
        }

        ////formatting date displayed
        if(lastModified !== 'No Entry Yet Today'){
        lastModified = lastModified.split("T")[0];   
        lastModified = lastModified.split("-");  
        lastModified = `${lastModified[1]}-${lastModified[2]}-${lastModified[0]}`
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
