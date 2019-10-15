import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

import StoreTableRow from './StoreTableRow';

class StoreTable extends Component {
    state = {
        isAdding: false
    };

    clickAdd = (event) => {
        this.setState({
            ...this.state,
            isAdding: !this.state.isAdding
        })
    }

    render() {
        ////made up data for the purpose of testing client-side logic
        let mockStoreArray = [
                {
                    id:1,
                    name: 'Hooha',
                    address: '321 Achoooo',
                    order: 1,
                    status: 'active'
                },
                {
                    id:2,
                    name: 'Hooha',
                    address: '321 Achoooo',
                    order: 2,
                    status: 'probation'
                },
                {   
                    id:3,
                    name: 'Hooha',
                    address: '321 Achoooo',
                    order: 3,
                    status: 'prospect'
                },
            ];

        ////map function to create rows with array data
        let storeTableData = mockStoreArray.map((item, index) => {
            return (
                <StoreTableRow 
                    key={index} 
                    item={item} />
            )
        })

        ////adds a new row when 'Add Store' button is clicked
        let newRow;
        if(this.state.isAdding){
            const emptyItem = {}
            newRow = <StoreTableRow editable={true} addable={true} item={emptyItem} />
        }

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
                    
                    {newRow}
                </table>
                <button onClick={this.clickAdd}>Add Store</button>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(StoreTable);
