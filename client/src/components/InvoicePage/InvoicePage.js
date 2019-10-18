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
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

const styles = (theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 300
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
});


class InvoicePage extends Component {
    state = {
        selectedDate: '',
        selectedStore:  {
            id: 0,
            name: 'SelectStore'
        }
    };

    handleDateChange = (date) => {
        this.setState({
            selectedDate: date
        }, ()=>{
            console.log(this.state.selectedDate)
        })
    }

    handleStoreChange = (event) => {
        this.setState({
            selectedStore: {
                name: event.target.value.name,
                address: event.target.value.address
            }
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
                address: '123 HotChip lane'
            },
            {
                product_name: "Bananas",
                product_sub_type: "Chewy",
                sold_product_count: 1,
                unit_sale_price: 4.35,
                store_id: 4,
                name: 'Cheeto Town',
                address: '456 Takis Blvd'
            }
        ]

        let storeList;
        const storeData = mockInvoiceData;

        if(storeData.length > 0){
            storeList = storeData.map((item, index) => {
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
                <FormControl>
                    <InputLabel htmlFor="store">{this.state.selectedStore.name}</InputLabel>
                    <Select
                        value={this.state.selectedStore.name}
                        className="store-selector"
                        onChange={this.handleStoreChange}
                        inputProps={{
                            name: this.state.selectedStore.name,
                            id: 'store',
                        }}
                    >
                        {storeList}
                    </Select>
                </FormControl>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    /> 
                </MuiPickersUtilsProvider>
                
                <h2>Invoice for Date</h2>
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
