import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import InvoiceTable from '../InvoicePage/InvoiceTable';
import InvoiceHeader from './InvoiceHeader';
import './InvoicePage.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'


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
        store_id: null
    };

    /////Handler functions for selecting dates and store
    handleStartDateChange = (date) => {
        
        this.setState({
            startDate: date
        }, ()=>{
            console.log(this.state)
        })
    }

    handleEndDateChange = (date) => {
        this.setState({
            endDate: date
        }, ()=>{
            console.log(this.state)
        })
    }

    handleInvoiceDateChange = (date) => {
        this.setState({
            invoiceDate: date
        }, ()=>{
            console.log(this.state)
        })
    }

    handleStoreChange = (event) => {
        this.setState({
            store_id: event.target.value
        }, () => {
            console.log(event.target.value)
        })
    }

    handleChangeInvoiceNumber = (event) => {
        this.setState({
            ...this.state,
            invoiceNum: event.target.value
        })
    }

    render() {

        const mockInvoiceData = [
            {
                product_name: "Applezz",
                product_sub_type: "Green ones",
                sold_product_count: 33,
                unit_sale_price: 4.38,
                store_id: 4,
                name: 'Food Mart',
                address: '123 Address St'
            },
            {
                product_name: "Bananas",
                product_sub_type: "Chewy",
                sold_product_count: 1,
                unit_sale_price: 4.35,
                store_id: 4,
                name: 'Food Mart',
                address: '456 Address Blvd'
            },
            {
                product_name: "Bananas",
                product_sub_type: "Chewy",
                sold_product_count: 1,
                unit_sale_price: 4.35,
                store_id: 1,
                name: 'Gas Station',
                address: '456 Address Blvd'
            }
        ]

        ////this generates the list on the drop down store selector
        const storeData = mockInvoiceData;
        ////const storeData = this.props.store.storesReducer

        let storeSelectorList;
        if(storeData){
            storeSelectorList = storeData.map((item, index) => {
                return(
                    <MenuItem key={index} value={item.store_id}>
                        {item.name} - {item.address}
                    </MenuItem>
                )
            })
        }
        
        ////this filters the data to match the store_id of the selected store
        let tableDataToRender;
  
            tableDataToRender = storeData.filter((item, index) => {
                return item.store_id == this.state.store_id;
            })
    
        ////these variables will hold the dates and store name to be rendered on the page
        let startDateToRender =<span className="dateUnfilled">Start</span>;
        let endDateToRender = <span className="dateUnfilled">End</span>;
        let storeNameToRender;
        let invoiceDateToRender = <span className="dateUnfilled">Date</span>;
        let invoiceNumToRender = <span className="dateUnfilled">Inv #</span>
        ////if values have been entered, they will render on the page
        if(this.state.startDate){
            startDateToRender = this.state.startDate.format("MM/DD/YY");
        }
        if(this.state.endDate){
            endDateToRender = this.state.endDate.format("MM/DD/YY");
        }
        if(this.state.store_id){
            storeNameToRender = tableDataToRender[0].name;
            console.log(tableDataToRender);
        }
        if(this.state.invoiceDate){
            invoiceDateToRender = this.state.invoiceDate.format("MM/DD/YY");
        }
        if(this.state.invoiceNum){
            invoiceNumToRender = this.state.invoiceNum;
        }

        return (
            <div className="invoice-container">
                <div>
                
                </div>
                {/* ////////////////////////////////////////////////// */}
                <div className="invoice-selector-box">
                    {/* Select Store drop-down */}
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
                    <br/>
                    <Input
                        className="selector"
                        placeholder={`Invoice #`}
                        onChange={(event) => this.handleChangeInvoiceNumber(event, 'invoiceNum')}
                    />
                    <br />
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
                        <br/>
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
                </div>
                {/* ////////////////////////////////////////////////// */}
                <br/>
                <InvoiceHeader 
                    startDateToRender={startDateToRender} 
                    endDateToRender={endDateToRender}
                    invoiceDateToRender={invoiceDateToRender}
                    invoiceNumToRender={invoiceNumToRender}/>

                <h2>BILL TO: {storeNameToRender}</h2>
                

                <InvoiceTable tableDataToRender={tableDataToRender}/>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(InvoicePage);
