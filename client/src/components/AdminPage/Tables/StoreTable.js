import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button } from '@material-ui/core';

import StoreTableRow from './StoreTableRow';

class StoreTable extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_STORES' })
    }

    state = {
        isAdding: false
    };

    clickAddStore = (event) => {
        console.log('in add store')
        this.setState({
            ...this.state,
            isAdding: !this.state.isAdding
        })
    }

    clickAddCancel = (event) => {
        this.setState({
            ...this.state,
            isAdding: false
        })
    }

    render() {
        const storesArray = this.props.store.stores

        let storeTableData = storesArray.map((item, index) => {
            return (
                <StoreTableRow
                    key={index}
                    item={item} 
                    />
            )
        })

        let newRow;
        if (this.state.isAdding) {
            const emptyItem = {}
            newRow = <StoreTableRow clickAddStore={this.clickAddStore} editable={true} addable={true} item={emptyItem} />
        }

        return (
            <div>
                <table className="admin-table">
                    <tr>
                        <th>Delivery Order</th>
                        <th>Store name</th>
                        <th>Address</th>
                        <th>Active?</th>
                        <th>Store Contact Name</th>
                        <th>Store Contact Phone</th>
                        <th>Store Contact Email</th>
                        <th>Store Phone</th>
                        <th>Actions</th>
                    </tr>
                    {storeTableData}

                    {newRow}
                </table>
                <Button onClick={this.clickAddStore}>Add Store</Button>
                <Button onClick={this.clickAddCancel}>Cancel</Button>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(StoreTable);
