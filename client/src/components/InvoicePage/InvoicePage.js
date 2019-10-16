import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import InvoiceTable from '../InvoicePage/InvoiceTable';
import './InvoicePage.css';

class InvoicePage extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {

        const mockInvoiceData = [
            {
                product_name: "Applezz",
                product_sub_type: "Green ones",
                sold_product_count: 33,
                store_id: 4,
                unit_sale_price: 4.35
            },
            {
                product_name: "Bananas",
                product_sub_type: "Chewy",
                sold_product_count: 1,
                store_id: 4,
                unit_sale_price: 4.35
            }
        ]

        return (
            <div className="invoice-container">
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
