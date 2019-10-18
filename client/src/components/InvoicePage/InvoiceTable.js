import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class InvoiceTable extends Component {
   

    render() {
                
        const tableData = this.props.mockInvoiceData
        let tableToRender;
        
        if(this.props.mockInvoiceData.length > 0){
            tableToRender = tableData.map((item, index) => {
                return(
                    <tr key={index}>
                        <td>{item.product_name}</td>
                        <td>{item.product_sub_type}</td>
                        <td>{item.sold_product_count}</td>
                        <td className="money-column">
                            {item.unit_sale_price}
                        </td>
                        <td className="money-column">
                            {Number.parseFloat(
                                item.sold_product_count 
                                    * item.unit_sale_price).toFixed(2)
                            }
                        </td>
                    </tr>
                )
            })
        }



        return (
            <div>
                <table className="invoice-table">
                    <thead>
                        <tr>
                        <th>Product</th>
                        <th>Sub-type</th>
                        <th>Sold</th>
                        <th>Price</th>
                        <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableToRender}
                    </tbody>
                </table>
                
                
            </div>
        );
    }
}

export default connect(mapStoreToProps)(InvoiceTable);
