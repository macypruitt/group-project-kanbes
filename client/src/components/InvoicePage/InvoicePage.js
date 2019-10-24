import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import InvoiceTable from '../InvoicePage/InvoiceTable';
import InvoiceHeader from './InvoiceHeader';
import './InvoicePage.css';
import {
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Grid
}
    from '@material-ui/core'
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';
import generatePassword from 'password-generator';


import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

//Will hold invoice information


class InvoicePage extends Component {
    state = {
        startDate: Date.getDate,
        endDate: Date.getDate,
        invoiceDate: Date.getDate,
        store_id: null,
        invoiceNum: ''
    };

    componentDidMount() {
        // Grabs all active stores
        this.props.dispatch({ type: 'FETCH_ACTIVE_STORES' });
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
        }, () => {
            this.setInvoiceNumber(this.state.invoiceDate.format("MMDDYYYY"))
        })
    }

    handleStoreChange = (event) => {
        this.setState({
            ...this.state,
            store_id: event.target.value
        }, () => {
            this.props.dispatch({ type: 'FETCH_INVOICE', payload: this.state.store_id });
            this.setInvoiceNumber(this.state.store_id)
        })
    }

    handleChangeInvoiceNumber = (event) => {
        this.setState({
            ...this.state,
            invoiceNum: event.target.value
        })
    }

    setInvoiceNumber = (input) => {
        console.log('in set invoice number')
        let randomCharacter = generatePassword(1, false)
        let invoiceNumber = this.state.invoiceNum
        invoiceNumber += input + randomCharacter

        this.setState({
            ...this.state,
            invoiceNum: invoiceNumber
        },() =>{
            console.log(this.state)
        })
    }

    postInvoice = (event) => {
        this.props.dispatch({ type: 'POST_INVOICE', payload: this.state});
    }

    render() {
        let invoiceData = [];
        let tableDataToRender;

        if (this.props.store.invoice.length > 0) {
            invoiceData = this.props.store.invoice
        }


        //     invoiceData = invoiceData.filter(function (el) {
        //   return el.last_modified <= parseFloat(param.labormax) 


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
        
        ////if values have been entered, they will render on the page
        if (this.state.startDate) {
            startDateToRender = this.state.startDate.format("MM/DD/YYYY");
        }
        else {
            startDateToRender = date
        }
        if (this.state.endDate) {
            endDateToRender = this.state.endDate.format("MM/DD/YYYY");
        }
        else {
            endDateToRender = date
        }
        if (this.state.store_id) {
            storeNameToRender = tableDataToRender[0].store_name;
        }
        if (this.state.invoiceDate) {
            invoiceDateToRender = this.state.invoiceDate.format("MM/DD/YYYY");
        }
        else {
            invoiceDateToRender = date
        }
        if (this.state.invoiceNum) {
            invoiceNumToRender = this.state.invoiceNum
        }

        return (
            <KanbeTemplate>
                <div className="invoice-container">

                    <div>

                    </div>
                    {/* ////////////////////////////////////////////////// */}
                    <Grid className="invoice-selector-box" container spacing={2}>
                        {/* Select Store drop-down */}
                        <Grid item xs={3}>
                            <FormControl >
                                <InputLabel className="store-selector" htmlFor="store_name">{'Select Store'}</InputLabel>
                                <Select
                                    className="selector"
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
                        <Grid container spacing={2} justify="center">
                            <Grid item xs={6}>
                                <Button onclick={this.postInvoice}>Save Invoice</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button>Format Page for Print</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* ////////////////////////////////////////////////// */}
                    <br />
                    <InvoiceHeader
                        startDateToRender={startDateToRender}
                        endDateToRender={endDateToRender}
                        invoiceDateToRender={invoiceDateToRender}
                        invoiceNumToRender={invoiceNumToRender} />

                    <h2>BILL TO: {storeNameToRender}</h2>


                    <InvoiceTable tableDataToRender={invoiceData} />
                </div>
            </KanbeTemplate >
        );
    }
}

export default connect(mapStoreToProps)(InvoicePage);
