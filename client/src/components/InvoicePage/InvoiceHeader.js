import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import logo from './logo.png';
import {
    Grid,
    Typography
 } from '@material-ui/core/'

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace 
// the component name TemplateClass with the name for the new 
// component.
class InvoiceHeader extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {
        return (
            <div className="invoice-header">
                <Grid container spacing={1} >
                    <Grid item xs={3}>
                        <img src={logo} className="invoice-logo img-print"/>
                    </Grid>
                    <Grid item className="light-bg" xs={3}>
                        <Typography  align='left' variant='body1'>4747 Troost Ave</Typography>
                        <Typography  align='left' variant='body1'>Kansas City, MO 64110</Typography>
                        <Typography  align='left' variant='body1'>P: (816)-808-3105</Typography>
                    </Grid>
                    <Grid item className="light-bg"xs={3}>
                        <Typography  align='left' variant='body1'><a href="mailto:kanbesmarket@gmail.com">kanbesmarket@gmail.com</a></Typography>
                        <Typography  align='center' variant='body1'></Typography>
                        <Typography align='left' variant='body1'><a href="http://www.kanbesmarkets.org">www.kanbesmarkets.org</a></Typography>
                    </Grid>
                    <Grid item className="dark-bg img-print" xs={3}>
                        <Typography className="dark-bg invoice-info" align='left' variant='body2'>Invoice No: {this.props.invoiceNumToRender}</Typography>
                        <Typography className="dark-bg invoice-info" align='left' variant='body2'><span className="print-date">Invoice Date:</span> {this.props.invoiceDateToRender}</Typography>
                    <Typography className="dark-bg invoice-info" align='left' variant='body2'><span className="print-date date-span">Billing Period:</span> {this.props.startDateToRender} - {this.props.endDateToRender}</Typography>
                    </Grid>
                    {/* <tbody>
                       <tr>
                           <td className="light-bg"> 4747 Troost Ave</td>
                           <td className="light-bg"> <a href="mailto:kanbesmarket@gmail.com">kanbesmarket@gmail.com</a></td>
                           <td className="dark-bg" id="inv-print"> Invoice No.</td>
                           <td className="dark-bg"> {this.props.invoiceNumToRender}</td>
                        </tr> 
                       <tr>
                           <td className="light-bg"> Kansas City, MO 64110</td>
                           <td className="light-bg"> <a href="http://www.kanbesmarkets.org">www.kanbesmarkets.org</a></td>
                           <td className="dark-bg" id="inv-print"> Invoice Date:</td>
                           <td className="dark-bg"> {this.props.invoiceDateToRender}</td>
                        </tr> 
                       <tr>
                           <td className="light-bg"> P: (816)-808-3105</td>
                           <td className="light-bg"> </td>
                           <td className="dark-bg" id="inv-print"> Billing Period:</td>
                           <td className="dark-bg"> {this.props.startDateToRender} - {this.props.endDateToRender}</td>
                        </tr> 
                    </tbody> */}
                </Grid>
                
            </div>
        );
    }
}

export default connect(mapStoreToProps)(InvoiceHeader);
