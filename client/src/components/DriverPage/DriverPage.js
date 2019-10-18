import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';
import { withRouter } from 'react-router';
import DriverTable from './DriverTable';
import './DriverPage.css'

class DriverPage extends Component {
    render() {


        let storeName = 'test';
        ////setState using store name as header
        if (this.props.store.storeInventory.length > 0) {
            storeName = this.props.store.storeInventory[0].store_name
        }
       

        ////this simulates the array data from the database query; it will be replaced with reducer data
        let dataForDriver = [];

        ////dataForDriver = this.props.store...........
        dataForDriver = this.props.store.storeInventory
        // [
        //     {
        //         product_id: 1,
        //         product_name: 'Apples',
        //         product_sub_type: 'Big Red',
        //         standard_par: 12,
        //         last_par: 8,
        //         store_id: 3
        //     }
        // ]


        ////driverTableHolder shows a table only if reducer is holding data
        let driverTableHolder;
        if (dataForDriver.length > 0) {
            driverTableHolder = <DriverTable dataForDriver={dataForDriver} />
        }


        var today = new Date();
        var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


        return (
            <KanbeTemplate>
                <div className="driver-container">
                    <h2>{storeName}</h2>
                    <h3>{date}</h3>
                    {driverTableHolder}
                </div>
            </KanbeTemplate>
        )
    }
}

export default connect(mapStoreToProps)(withRouter(DriverPage));
