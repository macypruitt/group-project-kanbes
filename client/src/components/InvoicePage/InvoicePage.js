import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import InvoiceTable from '../InvoicePage/InvoiceTable';
import './InvoicePage.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

class InvoicePage extends Component {
    state = {
        startDate: (Date.getDate),
        endDate: (Date.getDate),
        store_name: null
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

    handleStoreChange = (event) => {
        this.setState({
            store_name: event.target.value
        }, () => {
            console.log(this.state)
        })
    }

    render() {

        const mockInvoiceData = [
            {
                product_name: "Applezz",
                product_sub_type: "Green ones",
                sold_product_count: 33,
                unit_sale_price: 4.35,
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
                name: 'Gas Station',
                address: '456 Address Blvd'
            }
        ]

        let storeSelectorList;
        const storeData = mockInvoiceData;

        if(storeData){
            storeSelectorList = storeData.map((item, index) => {
                return(
                    <MenuItem 
                        key={index}
                        value={item.name}
                    >
                        {item.name} - {item.address}
                    </MenuItem>
                )
            })
        }

       

        return (
            <div className="invoice-container">
                {/* ////////////////////////////////////////////////// */}
                <div className="invoice-selector-box">
                    <FormControl >
                        <InputLabel className="store-selector" htmlFor="admin_level">{'Select Store'}</InputLabel>
                        <Select
                            className="store-selector"
                            onChange={(event) => this.handleStoreChange(event, 'admin_level')}
                            value={this.state.store_name}
                            inputProps={{
                                name: 'store_name',
                                id: 'store_id',
                            }}
                        >
                            {storeSelectorList}
                        </Select>
                    </FormControl>
                    <br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Select Start Date"
                            value={this.state.startDate}
                            onChange={this.handleStartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        /> 
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Select End Date"
                            value={this.state.endDate}
                            onChange={this.handleEndDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        /> 
                    </MuiPickersUtilsProvider>
                </div>
                {/* ////////////////////////////////////////////////// */}
                
                <h2>Invoice for {this.state.store_name}</h2>
                <h4>Date</h4>

                <InvoiceTable mockInvoiceData={mockInvoiceData}/>
                
                <div className="invoice-totals">
                    <p>Store:</p>
                    <p>Kanbe's Due:</p>
                </div>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(InvoicePage);
