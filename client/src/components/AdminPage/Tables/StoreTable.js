import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

import StoreTableRow from './StoreTableRow';

class StoreTable extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {

        let mockStoreArray = [
                {
                    name: 'Hooha',
                    address: '321 Achoooo',
                    order: 1,
                    status: 'active'
                },
                {
                    name: 'Hooha',
                    address: '321 Achoooo',
                    order: 2,
                    status: 'probation'
                },
                {
                    name: 'Hooha',
                    address: '321 Achoooo',
                    order: 3,
                    status: 'prospect'
                },
            ];

        let storeTableData = mockStoreArray.map((item, index) => {
            return (
                <StoreTableRow 
                    key={index} 
                    item={item} />
            )
        })

        return (
            <div>
                <table className="admin-table">
                    <tr>
                        <th>Store name</th>
                        <th>Address</th>
                        <th>Order #</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    
                    {storeTableData}

                </table>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(StoreTable);
