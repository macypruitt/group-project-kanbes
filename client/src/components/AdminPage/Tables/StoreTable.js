import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

import StoreTableRow from './StoreTableRow';

class StoreTable extends Component {
    componentDidMount() {
        this.props.dispatch({type: 'FETCH_STORES' })
    }

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
        const storesArray = this.props.store.stores

        let storeTableData = storesArray.map((item, index) => {
            return (
                <StoreTableRow 
                    key={index} 
                    item={item} />
            )
        })

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
                        <th>Delivery Order</th>
                        <th>Store Status</th>
                        <th>Store Contact Name</th>
                        <th>Store Contact Phone</th>
                        <th>Store Contact Email</th>
                        <th>Store Phone</th>
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
