import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';
import { withRouter } from 'react-router';
import DriverTable from './DriverTable';
import { Grid, Button } from '@material-ui/core';
import './DriverPage.css';

class DriverPage extends Component {

    componentDidMount() {
        {/* This code is getting the store inventory. If there is no params id
            the FETCH_ACTIVE_STORE will grab the first store inventory*/}
        let selectedStoreId = this.props.match.params.id;
        let firstStore = true;
        if (selectedStoreId != null) {
            firstStore = false;
            this.props.dispatch({ type: 'FETCH_STORE_INVENTORY', payload: selectedStoreId });
        }
        this.props.dispatch({ type: 'FETCH_ACTIVE_STORES', payload: { firstStore } });
        this.props.dispatch({ type: 'FETCH_TODAYS_SALES', payload: this.props.match.params.id});
    }

    render() {
        console.log(this.props.store.todaysSales[0])
        let storeName;
        let address;
        let matchStore;
        let dailySales= 0;
        if(this.props.store.todaysSales.length > 0){
        dailySales = this.props.store.todaysSales[0]["Total Sales"]
        }

        {/* This code is checking to see if there is a store and params id available, 
            if both conditions are met, it will loop through active store array and 
            match the id with the params id to give store name & address */}
        if (this.props.store.activeStores.length > 0 && this.props.match.params.id) {
            for (let i = 0; i < this.props.store.activeStores.length; i++) {
                let activeStoreItem = this.props.store.activeStores[i];
                if (activeStoreItem.id === parseInt(this.props.match.params.id)) {
                    storeName = activeStoreItem.store_name;
                    address = activeStoreItem.store_address;
                    matchStore = activeStoreItem;
                }
            }
            {/*if the above conditions aren't met it will check to see if active Store
                has the stores and grab the first store information*/}
        } else if (this.props.store.activeStores.length > 0) {
            storeName = this.props.store.activeStores[0].store_name
            address = this.props.store.activeStores[0].address
            matchStore = this.props.store.activeStores[0];
        }
        
        ////this simulates the array data from the database query; it will be replaced with reducer data
        let dataForDriver = [];
        ////dataForDriver = this.props.store...........
        if (this.props.store.storeInventory.length > 0) {
            dataForDriver = this.props.store.storeInventory
        }

        ////driverTableHolder shows a table only if reducer is holding data
        let driverTableHolder; 
        if (dataForDriver.length > 0) {
            driverTableHolder = <DriverTable dataForDriver={dataForDriver} isAdding={false} current_store={this.props.match.params.id}/>
        } else {
            driverTableHolder = <DriverTable />
        }

        
        var today = new Date();
        var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        return (
            <KanbeTemplate>
                <div className="driver-container">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h1>{storeName}</h1>
                        </Grid>
                        <Grid item xs={4}>
                            <p>{address}</p>
                        </Grid>
                        <Grid item xs={4}>
                            <p>Today's Date: {date}</p>
                        </Grid>
                        <Grid item xs={4}>
                            <p>Today's Gross Sales: ${dailySales}</p>
                        </Grid>
                        <Grid item xs={12}>
                            {driverTableHolder}
                        </Grid>
                        <Grid>
                        </Grid>
                    </Grid>
                </div>
            </KanbeTemplate>
        )
    }
}

export default connect(mapStoreToProps)(withRouter(DriverPage));
