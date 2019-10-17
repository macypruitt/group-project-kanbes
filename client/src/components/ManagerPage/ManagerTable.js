import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import ManagerTableRow from './ManagerTableRow';

class ManagerTable extends Component {
    state = {
        isAdding: false,
        itemsToSubmit: []
    };

    clickAdd = (event) => {
        this.setstate({
            ...this.state,
            isAdding: !this.state.isAdding
        })
    }

    render() {
        ////this prevents error if driver reducer data is unavailable
        let warehouseDataForRender = [];
        warehouseDataForRender = this.props.dataForDriver;

        ////if reducer holds data, map it into rows of the table
        if (warehouseDataForRender.length > 0) {
            warehouseDataForRender = warehouseDataForRender.map((item, index) => {
                return <ManagerTableRow key={index} item={item} />
            })
        }
        let newRow;
        if (this.state.isAdding) {
            const emptyItem = {}
            newRow = <ManagerTableRow editable={true} addable={true} item={emptyItem} clickAddStore={this.clickAdd} />
        }
        return (
            <div>
                <table className="warehouse-table">
                    <thead>
                        <tr>
                            <th>Origin</th>
                            <th>Unit Sale Price</th>
                            <th> Expiration Date</th>
                            <th>Donated</th>
                            <th>Count</th>
                            <th>Supplier ID</th>
                            <th>Pounds</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {warehouseDataForRender}
                        {newRow}
                    </tbody>
                </table>
                <button onClick={this.clickAdd}>Add Product</button>
                <br />
            </div>
        );
    }

}
export default connect(mapStoreToProps)(ManagerTable);
