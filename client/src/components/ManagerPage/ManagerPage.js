import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import ManagerTable from './ManagerTable'
import './ManagerPage.css'

class ManagerPage extends Component {
    state = {
        heading: 'Warehouse View'
    };

    componentDidMount() {

    }

    render() {
        let dataForWarehouse = [];

        dataForWarehouse = [
            {
                origin: 'Honduras',
                unit_sale_price: '1.50',
                expiration_date: '12 / 25 / 2019',
                donated: 'yes',
                count: '25',
                supplier_id: '12345',
                pounds: '20'


            }
        ]

        let managerTableHolder;
        if (dataForWarehouse.length > 0) {
            managerTableHolder = <ManagerTable dataForWarehouse={dataForWarehouse} />
        }
        return (
            <div className="warehouse-container">
                <h2>{this.state.heading}</h2>

                {managerTableHolder}
            </div>
        );
    }
}


export default connect(mapStoreToProps)(ManagerPage);
