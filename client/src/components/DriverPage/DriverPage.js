import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';
import { withRouter } from 'react-router';
import DriverTable from './DriverTable';
import Grid from '@material-ui/core/Grid';
import './DriverPage.css'

class DriverPage extends Component {


    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ACTIVE_STORES' });
        this.props.dispatch({ type: 'FETCH_STORE_INVENTORY', payload: parseInt(this.props.match.params.id) })
    }



    render() {
        let storeName;
        let address;
        let matchStore;

        console.log(this.props.match.params.id, 'clicked id of store!')
        console.log(this.props.store, 'need to get to the store inventory')
        console.log(this.props.store.activeStores, 'I need the active store');


        //  using store name as header
        if (this.props.store.activeStores.length > 0 && this.props.match.params.id) {
            for (let i = 0; i < this.props.store.activeStores.length; i++) {
                let activeStoreItem = this.props.store.activeStores[i];
                if (activeStoreItem.id === parseInt(this.props.match.params.id)) {
                    storeName = activeStoreItem.store_name;
                    address = activeStoreItem.address;
                    matchStore = activeStoreItem;
                }
            }
        } else if (this.props.store.activeStores.length > 0) {
            storeName = this.props.store.activeStores[0].store_name
            address = this.props.store.activeStores[0].address
            matchStore = this.props.store.activeStores[0];
        }
        console.log(matchStore);


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
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h1>{storeName}</h1>
                        </Grid>
                        <Grid item xs={6}>
                            <p>{address}</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p>Today's Date: {date}</p>
                        </Grid>
                        <Grid item xs={12}>
                            {driverTableHolder}
                        </Grid>
                    </Grid>


                </div>
            </KanbeTemplate>
        )
    }
}

export default connect(mapStoreToProps)(withRouter(DriverPage));
