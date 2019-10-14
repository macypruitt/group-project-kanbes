import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

import SupplierTableRow from './SupplierTableRow';

class SupplierTable extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_SUPPLIERS' })
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

        const suppliersArray = this.props.store.suppliers

        // const mockSupplierArray = [
        //     {
        //         id: 1,
        //         name: 'C&C',
        //         contact_name: 'Johnny Veg',
        //         contact_number: '816-911-9111',
        //         address: '5901 Hotchip Lane'
        //     },
        //     {
        //         id: 1,
        //         name: 'C&C',
        //         contact_name: 'Johnny Veg',
        //         contact_number: '816-911-9111',
        //         address: '5901 Hotchip Lane'
        //     },
        //     {
        //         id: 1,
        //         name: 'C&C',
        //         contact_name: 'Johnny Veg',
        //         contact_number: '816-911-9111',
        //         address: '5901 Hotchip Lane'
        //     }
        // ]

        let supplierTableData = suppliersArray.map((item, index) => {
            return (
                <SupplierTableRow 
                    key={index} 
                    item={item} />
            )
        })

        let newRow;
        if(this.state.isAdding){
            const emptyItem = {}
            newRow = <SupplierTableRow editable={true} addable={true} item={emptyItem} />
        }

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

                    {newRow}
                </table>
                <button onClick={this.clickAdd}>Add Store</button>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(SupplierTable);
