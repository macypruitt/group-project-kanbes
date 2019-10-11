import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

import SupplierTableRow from './SupplierTableRow';

class SupplierTable extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {

        const mockSupplierArray = [
            {
                id: 1,
                name: 'C&C',
                contact_name: 'Johnny Veg',
                contact_number: '816-911-9111',
                address: '5901 Hotchip Lane'
            },
            {
                id: 1,
                name: 'C&C',
                contact_name: 'Johnny Veg',
                contact_number: '816-911-9111',
                address: '5901 Hotchip Lane'
            },
            {
                id: 1,
                name: 'C&C',
                contact_name: 'Johnny Veg',
                contact_number: '816-911-9111',
                address: '5901 Hotchip Lane'
            }
        ]

        let supplierTableData = mockSupplierArray.map((item, index) => {
            return (
                <SupplierTableRow 
                    key={index} 
                    item={item} />
            )
        })

        return (
            <div>
                <table className="admin-table">
                    <tr>
                        <th>Name</th>
                        <th>Contact name</th>
                        <th>Contact #</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    {supplierTableData}
                </table>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(SupplierTable);
