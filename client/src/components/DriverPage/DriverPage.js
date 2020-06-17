import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import mapStoreToProps from '../../redux/mapStoreToProps';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';
import { Grid, Button } from '@material-ui/core';
import './DriverPage.css';
import DriverTable from './DriverTable';

class DriverPage extends Component {

    componentDidMount() {
        //use store id to fetch inventory and sales data
        const selectedStoreId = this.props.match.params.id;
        if (selectedStoreId) {
            this.props.dispatch({ type: 'FETCH_STORE_INVENTORY', payload: selectedStoreId });
        } else {
            //default to id=1 if id not available via URL
            this.props.history.push('/driver/1');
            this.props.dispatch({ type: 'FETCH_STORE_INVENTORY', payload: 1 });
        }
        this.props.dispatch({ type: 'FETCH_ACTIVE_STORES' });
        this.props.dispatch({ type: 'FETCH_TODAYS_SALES', payload: selectedStoreId });
    }

    render() {
        console.log('driver data', this.props.store.storeInventory)
        const activeStore = this.props.store.activeStores[this.props.match.params.id];
        
        var today = new Date();
        var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();

        return (
            <KanbeTemplate>
                <div className="driver-container">
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <h1>{ activeStore ? activeStore.store_name : '' }</h1>
                        </Grid>

                        <Grid item xs={4}>
                            <p>{ activeStore ? activeStore.store_address : '' }</p>
                        </Grid>

                        <Grid item xs={4}>
                            <p>Today's Date: {date}</p>
                        </Grid>

                        <Grid item xs={4}>
                            <p>Today's Gross Sales: ${ this.props.store.todaysSales.length > 0 ? this.props.store.todaysSales[0]["Total Sales"] : 0 }</p>
                        </Grid>

                        <Grid item xs={12}>
                            <DriverTable dataForDriver={this.props.store.storeInventory} current_store={this.props.match.params.id}/>
                        </Grid>

                    </Grid>
                </div>
            </KanbeTemplate>
        )
    }
}

export default connect(mapStoreToProps)(withRouter(DriverPage));
