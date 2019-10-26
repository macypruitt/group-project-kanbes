import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import InvoiceTable from '../InvoicePage/InvoiceTable';
import InvoiceHeader from './InvoiceHeader';
import './InvoicePage.css';
// import Select from 'react-select';
import {
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Grid,
    Paper,
    FormHelperText,
    TextField,
    Input
}
    from '@material-ui/core'
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withRouter } from 'react-router';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';
import generatePassword from 'password-generator';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

//Will hold invoice information
const styles = theme => ({
    buttonEdit: {
        margin: 2,
        color: 'blue'
    },
    buttonNegative: {
        margin: 2,
        color: 'red'
    },
    buttonPositive: {
        margin: 2,
        color: 'color'
    },
    buttonSelected: {
        margin: 2,
        color: 'grey'
    },
    buttonNew: {
        margin: 2,
        color: 'green'
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

class InvoicePage extends Component {
    state = {
        startDate: Date.getDate,
        endDate: Date.getDate,
        invoiceDate: Date.getDate,
        store_id: null,
        invoiceNum: '',
        newInvoiceHidden: true,
        historicalInvoiceHidden: true,
        historicalStartDate: '',
        historicalEndDate: '',
        historicalInvoiceDate: ''
    };

    componentDidMount() {
        // Grabs all active stores
        this.props.dispatch({ type: 'FETCH_ACTIVE_STORES' });
        this.props.dispatch({ type: 'FETCH_INVOICE_PARAMETERS' });
    }

    /////Handler functions for selecting dates and store
    handleStartDateChange = (date) => {

        this.setState({
            ...this.state,
            startDate: date
        })
    }

    handleEndDateChange = (date) => {
        this.setState({
            ...this.state,
            endDate: date
        })
    }

    handleInvoiceDateChange = (date) => {
        this.setState({
            ...this.state,
            invoiceDate: date
        }
            , () => {
                this.setInvoiceNumber()
            })
    }

    handleStoreChange = (event) => {
        this.setState({
            ...this.state,
            store_id: event.target.value
        }, () => {
            this.props.dispatch({ type: 'FETCH_INVOICE', payload: this.state.store_id });
            this.setInvoiceNumber()
        })
    }

    handleChangeInvoiceNumber = (event) => {
        this.setState({
            ...this.state,
            invoiceNum: event.target.value
        })
    }

    setInvoiceNumber = (input) => {
        let randomCharacter = generatePassword(1, false)
        let invoiceNumber = this.state.invoiceNum
        if (this.state.invoiceDate) {
            invoiceNumber = this.state.invoiceDate.format("MMDDYYYY") + this.state.store_id + randomCharacter
        } else {
            invoiceNumber = this.state.store_id

        }
        this.setState({
            ...this.state,
            invoiceNum: invoiceNumber
        })
    }

    postInvoice = (event) => {
        this.props.dispatch({ type: 'POST_INVOICE', payload: this.state });
    }

    handleNewInvoiceClick = (event) => {
        this.setState({
            ...this.state,
            newInvoiceHidden: !this.state.newInvoiceHidden,
            historicalInvoiceHidden: true
        })
    }

    handleHistoricalInvoiceClick = (event) => {
        this.setState({
            ...this.state,
            newInvoiceHidden: true,
            historicalInvoiceHidden: !this.state.historicalInvoiceHidden
        })
    }

    handleChangeInvoiceParameters = (item) => {
        console.log(item)
        this.setState({
            ...this.state,
            historicalInvoiceDate: item.target.value.invoice_date,
            historicalStartDate: item.target.value.start_date,
            historicalEndDate: item.target.value.end_date
        },()=>{
            console.log(this.state)
        })
    }

    render() {
        const { classes, theme } = this.props;

        let invoiceData = [];
        let invoiceParameters = [];
        invoiceParameters = this.props.store.invoiceParameters;
        let tableDataToRender;
        let updatedInvoiceData = [];
        let historicalInvoiceSelectorList;

        if (invoiceParameters.length > 0) {
            historicalInvoiceSelectorList = invoiceParameters.map((item, index) => {
                let invoiceDate = ((item.invoice_date).split("T"))[0]
                let startDate = ((item.start_date).split("T"))[0]
                let endDate = ((item.end_date).split("T"))[0]
                return <MenuItem key={index} value={item}>({item.invoice_number}) - ({invoiceDate}) - ({startDate}) - ({endDate})</MenuItem>
            })
        }

        //filter invoice results by billing date pickers
        if (this.state.startDate && this.state.endDate && this.props.store.invoice.length > 0) {
            let startDate = this.state.startDate;
            let endDate = this.state.endDate;
            invoiceData = this.props.store.invoice;
            invoiceData = invoiceData.filter(function (el) {

                return Date.parse(el.last_modified) >= Date.parse(startDate.format("MM/DD/YYYY"))
                    && Date.parse(el.last_modified) <= Date.parse(endDate.format("MM/DD/YYYY"))
            })
        } else if (this.state.historicalStartDate && this.state.historicalEndDate && this.props.store.invoice.length > 0) {
            let startDate = this.state.historicalStartDate;
            let endDate = this.state.historicalEndDate;
            invoiceData = this.props.store.invoice;
            invoiceData = invoiceData.filter(function (el) {

                return Date.parse(el.last_modified) >= Date.parse(startDate)
                    && Date.parse(el.last_modified) <= Date.parse(endDate)
            })
            console.log(invoiceData)
        }

        //group array by product
        invoiceData.reduce(function (res, value) {
            if (!res[value.product_id + value.sold_price_per_unit]) {
                res[value.product_id + value.sold_price_per_unit] = { product_id: value.product_id, product_name: value.product_name, sold_price_per_unit: value.sold_price_per_unit, "Total Sales": 0, "Total Product Count": 0 };
                updatedInvoiceData.push(res[value.product_id + value.sold_price_per_unit])
            }
            res[value.product_id + value.sold_price_per_unit]["Total Sales"] = parseFloat(res[value.product_id + value.sold_price_per_unit]["Total Sales"]) + parseFloat(value["Total Sales"]);
            res[value.product_id + value.sold_price_per_unit]["Total Product Count"] = parseInt(res[value.product_id + value.sold_price_per_unit]["Total Product Count"]) + parseInt(value.sold_product_count);

            return res;
        }, {});


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

        ////this filters the data to match the store_id of the selected store


        tableDataToRender = storeData.filter((item, index) => {
            return item.id == this.state.store_id;
        })

        ////these variables will hold the dates and store name to be rendered on the page
        let startDateToRender = <span className="dateUnfilled">Start</span>;
        let endDateToRender = <span className="dateUnfilled">End</span>;
        let storeNameToRender;
        let invoiceDateToRender = <span className="dateUnfilled">Date</span>;
        let invoiceNumToRender = <span className="dateUnfilled">Inv #</span>
        var today = new Date();
        var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        let newInvoiceSelector;
        let historicalInvoiceSelector;

        ////if values have been entered, they will render on the page
        if (this.state.historicalStartDate) {
            startDateToRender = ((this.state.historicalStartDate).split("T"))[0]
        }
        else if (this.state.startDate) {
            startDateToRender = this.state.startDate.format("MM/DD/YYYY");
        }
        else {
            startDateToRender = date
        }

        if (this.state.historicalEndDate) {
            endDateToRender = ((this.state.historicalEndDate).split("T"))[0]
        }
        else if (this.state.endDate) {
            endDateToRender = this.state.endDate.format("MM/DD/YYYY");
        }
        else {
            endDateToRender = date
        }

        if (this.state.store_id) {
            storeNameToRender = tableDataToRender[0].store_name;
        }

        if (this.state.historicalInvoiceDate) {
            invoiceDateToRender = ((this.state.historicalInvoiceDate).split("T"))[0]
        }
        else if (this.state.invoiceDate) {
            invoiceDateToRender = this.state.invoiceDate.format("MM/DD/YYYY");
        }
        else {
            invoiceDateToRender = date
        }


        if (this.state.invoiceNum) {
            invoiceNumToRender = this.state.invoiceNum
        }

        if (!this.state.historicalInvoiceHidden) {
            historicalInvoiceSelector =
                <FormControl className={classes.formControl}>
                    <FormHelperText>Select historical invoice</FormHelperText>
                    <Select
                        // value={values.age}
                        onChange={this.handleChangeInvoiceParameters}
                        name="age"
                        displayEmpty
                    // className={classes.selectEmpty}
                    >
                        <MenuItem value="" disabled>
                            Invoice # - Invoice Date - Billing Start Date - Billing End Date
                        </MenuItem>
                        {historicalInvoiceSelectorList}
                    </Select>

                </FormControl>
        }

        if (!this.state.newInvoiceHidden) {
            newInvoiceSelector =
                <div className="no-print">
                    <Paper>
                        <Grid className="invoice-selector-box" alignItems="center" direction="row" container spacing={2}>

                            {/* Select Store drop-down */}
                            <Grid item xs={3} className="storeSelector">
                                <FormControl className="pushdown" >
                                    <InputLabel className="store-selector no-print" htmlFor="store_name">{'Select Store'}</InputLabel>
                                    <Select
                                        label="Select Store"
                                        className="selector"
                                        margin="normal"
                                        onChange={(event) => this.handleStoreChange(event, 'store_name')}
                                        value={this.state.store_id}
                                        inputProps={{
                                            name: '',
                                            id: 'store_id',
                                        }}
                                    >
                                        {storeSelectorList}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    {/* Select invoice date drop-down */}
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM-DD-YYYY"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Select Invoice Date"
                                        value={this.state.invoiceDate}
                                        onChange={this.handleInvoiceDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    {/* Select Billing Start date drop-down */}
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM-DD-YYYY"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Select Billing Start"
                                        value={this.state.startDate}
                                        onChange={this.handleStartDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    {/* Select Billing End date drop-down */}
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM-DD-YYYY"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Select Billing End"
                                        value={this.state.endDate}
                                        onChange={this.handleEndDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>

                            </Grid>

                            {/* ////////////////////////////////////////////////// */}

                            <Grid container spacing={2} justify="center">
                                <Grid item xs={12}>
                                    <Button variant="contained" className={classes.buttonNew} onClick={this.postInvoice}>Save Invoice Parameters</Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Paper>
                </div>
        }

        return (

            <KanbeTemplate>
                <div className="invoice-container">
                    <div className="no-print" id="decisionButtons">
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Button variant="contained" className={classes.buttonPositive} onClick={(event) => this.handleNewInvoiceClick()}>New Invoice</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" className={classes.buttonPositive} onClick={(event) => this.handleHistoricalInvoiceClick()}>Historical Invoice</Button>
                            </Grid>
                        </Grid>
                    </div>
                    {/* ////////////////////////////////////////////////// */}
                    {newInvoiceSelector}
                    {historicalInvoiceSelector}
                    {/* ////////////////////////////////////////////////// */}

                    <hr className="hr no-print"></hr>
                    <Paper className="invoiceContainer">
                        <Grid container>
                            <br />
                            <InvoiceHeader
                                startDateToRender={startDateToRender}
                                endDateToRender={endDateToRender}
                                invoiceDateToRender={invoiceDateToRender}
                                invoiceNumToRender={invoiceNumToRender} />
                            <Grid item xs={12}>
                                <h2>BILL TO: {storeNameToRender}</h2>
                            </Grid>
                            <Grid item xs={12}>
                                <InvoiceTable tableDataToRender={updatedInvoiceData} />
                            </Grid>
                        </Grid>
                    </Paper>


                </div>
            </KanbeTemplate >
        );
    }
}


InvoicePage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default connect(mapStoreToProps)(
    withStyles(styles, { withTheme: true })(withRouter(InvoicePage))
);
