import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withRouter } from 'react-router';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
    Grid,
    Paper,
    MenuItem,
    FormControl,
    InputLabel,
    Select
} from '@material-ui/core';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import './PerformancePage.css'
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';
import GlobalSalesChart from './globalSalesChar/globalSalesChart';

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

class PerformancePage extends Component {
    state = {
        store_id: false,
        product_name: false,
        product_sub_type: '',
        supplier_id: false
    };

    componentDidMount() {
        // Grabs all active stores
        this.props.dispatch({ type: 'FETCH_ACTIVE_STORES' });
        this.props.dispatch({ type: 'FETCH_PRODUCTS' });
        this.props.dispatch({ type: 'FETCH_SUPPLIERS' });
        this.props.dispatch({ type: 'FETCH_GLOBAL_SALES' });
    }

    handleStoreChange = (event) => {
        if (event.target.value == 'All') {
            this.setState({
                ...this.state,
                store_id: false
            })
        } else {
            this.setState({
                ...this.state,
                store_id: event.target.value
            })
        }
    }

    handleChangeProductName(event) {
        if (event.target.value == 'All') {
            this.setState({
                ...this.state,
                product_name: false
            })
        } else {
            this.setState({
                ...this.state,
                product_name: event.target.value,
            })
        }
    }

    handleChangeSupplierName(event) {
        console.log(event.target)
        if (event.target.value == 'All') {
            this.setState({
                ...this.state,
                supplier_id: false
            })
        } else {
            this.setState({
                ...this.state,
                supplier_id: event.target.value.id,
            })
        }
    }

    render() {
        console.log(this.props.store.globalSales)
        const { classes, theme } = this.props;

        ////activeProducts and activeProductSubTypes will display all available options of products
        let activeProducts = [];
        let activeProductSubTypes = [];
        let globalSalesArray = [];
        let totalSales = 0;
        let totalProductCount = 0;
        let productsArray = [];

        ////their values come from the reducer
        activeProducts = this.props.store.activeProducts;
        activeProductSubTypes = this.props.store.activeProducts;
        globalSalesArray = this.props.store.globalSales;

        //filter global Sales by product type
        if (this.state.product_name) {
            let productName = this.state.product_name
            globalSalesArray = globalSalesArray.filter(function (el) {
                return el.product_name == productName
            })
        }

        //filter global Sales by store
        if (this.state.store_id) {
            let storeID = this.state.store_id
            globalSalesArray = globalSalesArray.filter(function (el) {
                return el.store_id == storeID
            })
        }

        //filter global Sales by supplier
        if (this.state.supplier_id) {
            let supplierID = this.state.supplier_id
            globalSalesArray = globalSalesArray.filter(function (el) {
                return el.supplier_id == supplierID
            })
        }

        ///loop through global sales to get total sales $
        for (let i = 0; i < globalSalesArray.length; i++) {
            totalSales += parseFloat(globalSalesArray[i]["Total Sales"]);
            totalProductCount += parseFloat(globalSalesArray[i].sold_product_count);
            productsArray.push((globalSalesArray[i].product_id).toString())
        }

        //get distinct count of product types sold
        const distinct = (values, index, self) => {
            return self.indexOf(values) === index;
        }

        const distinctProductArray = productsArray.filter(distinct);
        const distinctProductCount = distinctProductArray.length;

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

        let suppliers = [];
        suppliers = this.props.store.suppliers
        if (suppliers.length > 0) {
            suppliers = suppliers.map((item, index) => {
                return <MenuItem key={index} value={item}>{item.supplier_name}</MenuItem>
            })
        }

        ////this generates the list on the drop down store selector
        // const storeData = mockInvoiceData;
        const storeData = this.props.store.activeStores;

        let storeSelectorList;
        if (storeData) {
            storeSelectorList = storeData.map((item, index) => {
                return (
                    <MenuItem key={index} value={item.id}>
                        {item.store_name} - {item.address}
                    </MenuItem>
                )
            })
        }

        return (
            <KanbeTemplate>
                <Grid container spacing={3} className="admin-container">
                    {/* <Grid item xs={12}>
                        <h2>Kanbe's Performance Metrics</h2>
                    </Grid> */}
                    <Grid item xs={12}>
                        <h3>FILTER BY...</h3>
                        <hr></hr>
                        <Grid container spacing={3} direction="row" alignItems="center">
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="product_name">{'Product'}</InputLabel>
                                    <Select
                                        label="Product"
                                        className="selector"
                                        // placeholder={product_name}
                                        onChange={(event) => this.handleChangeProductName(event, 'product_name')}
                                        value={this.state.product_name}
                                        inputProps={{
                                            name: 'product_name',
                                            id: 'product_name',
                                        }}
                                    >
                                        <MenuItem value={'All'}>
                                            All
                                        </MenuItem>
                                        {activeProducts}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl} >
                                    <InputLabel htmlFor="store">{'Store'}</InputLabel>
                                    <Select
                                        label="Store"
                                        className="selector"
                                        margin="normal"
                                        placeholder={'All'}
                                        onChange={(event) => this.handleStoreChange(event, 'store')}
                                        value={this.state.store_id}
                                        inputProps={{
                                            name: 'store',
                                            id: 'store',
                                        }}
                                    >
                                        <MenuItem value={'All'}>
                                            All
                                        </MenuItem>
                                        {storeSelectorList}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="supplier">{'Supplier'}</InputLabel>
                                    <Select
                                        label="Supplier"
                                        className="selector"
                                        margin="normal"
                                        onChange={(event) => this.handleChangeSupplierName(event, 'supplier')}
                                        value={this.state.supplier}
                                        inputProps={{
                                            name: 'supplier',
                                            id: 'supplier',
                                        }}
                                    >
                                        <MenuItem value={'All'}>
                                            All
                                        </MenuItem>
                                        {suppliers}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                    <h3>AGGREGATES</h3>
                    <hr></hr>
                        <h4>Kanbe's has sold...</h4>
                        <Grid container direction="row" spacing={3}>
                            <Grid item xs={4}>
                                <Paper className="aggregates">
                                    <h1>{totalProductCount}</h1> units of produce...
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className="aggregates">
                                    ...across <h1>{distinctProductCount}</h1> product type(s)...
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className="aggregates">
                                    ...totalling <h1>${totalSales.toFixed(2)}</h1> worth of produce.
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                    <h3>METRICS OVER TIME</h3>
                    <hr></hr>
                    <GlobalSalesChart globalSales={globalSalesArray}/>
                    </Grid>
                </Grid >
            </KanbeTemplate>
        );
    }
}


PerformancePage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default connect(mapStoreToProps)(
    withStyles(styles, { withTheme: true })(withRouter(PerformancePage))
);
