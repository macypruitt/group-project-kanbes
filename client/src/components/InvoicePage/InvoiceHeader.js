import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import logo from './logo.png';

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
                <table className="invoice-header-table">
                    <img src={logo} className="invoice-logo"/>
                    <tbody>
                       <tr>
                           <td className="light-bg"> 4747 Troost Ave</td>
                           <td className="light-bg"> <a href="mailto:kanbesmarket@gmail.com">kanbesmarket@gmail.com</a></td>
                           <td className="dark-bg"> Invoice No.</td>
                           <td className="dark-bg"> {this.props.invoiceNumToRender}</td>
                        </tr> 
                       <tr>
                           <td className="light-bg"> Kansas City, MO 64110</td>
                           <td className="light-bg"> <a href="http://www.kanbesmarkets.org">www.kanbesmarkets.org</a></td>
                           <td className="dark-bg"> Invoice Date:</td>
                           <td className="dark-bg"> {this.props.invoiceDateToRender}</td>
                        </tr> 
                       <tr>
                           <td className="light-bg"> P: (816)-808-3105</td>
                           <td className="light-bg"> </td>
                           <td className="dark-bg"> Billing Period:</td>
                           <td className="dark-bg"> {this.props.startDateToRender} - {this.props.endDateToRender}</td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(InvoiceHeader);
