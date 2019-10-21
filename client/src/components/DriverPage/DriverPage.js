import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';
import { withRouter } from 'react-router';
import DriverTable from './DriverTable';
import './DriverPage.css'

class DriverPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ACTIVE_STORES' })
    }

    render() {
        let storeName = 'test';
        ////setState using store name as header
        if (this.props.store.stores.length > 0) {
            storeName = this.props.store.stores[0].store_name
            let id = this.props.store.stores[0].id
            // this.props.dispatch({ type: 'FETCH_STORE_INVENTORY', payload: id })
        }
        ////this simulates the array data from the database query; it will be replaced with reducer data
        let dataForDriver = [];
        ////dataForDriver = this.props.store...........
        if (this.props.store.storeInventory.length > 0) {
            dataForDriver = this.props.store.storeInventory
            console.log(dataForDriver, 'what is this')
        }


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
                    <h3></h3>
                    <h3>{date}</h3>
                    {driverTableHolder}
                </div>
            </KanbeTemplate>
        )
    }
}

export default connect(mapStoreToProps)(withRouter(DriverPage));
