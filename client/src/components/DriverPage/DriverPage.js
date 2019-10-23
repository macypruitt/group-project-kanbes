import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';
import { withRouter } from 'react-router';
import DriverTable from './DriverTable';
import './DriverPage.css'

class DriverPage extends Component {

    
    componentDidMount(){
    this.props.dispatch({ type: 'FETCH_ACTIVE_STORES' });
    this.props.dispatch({ type: 'FETCH_STORE_INVENTORY', payload: parseInt(this.props.match.params.id) })  
    }

    

    render() {
        console.log(this.props.match.params.id)
        let storeName;
        let address;
        let matchStore;

        //  using store name as header
        if (this.props.store.activeStores.length > 0 && this.props.match.params.id) {
            for(let i = 0; i < this.props.store.activeStores.length; i++){
                let activeStoreItem = this.props.store.activeStores[i];
                if(activeStoreItem.id === parseInt(this.props.match.params.id)){
                    storeName = activeStoreItem.store_name;
                    address = activeStoreItem.address;
                    matchStore = activeStoreItem;
                }
            }
        } else if (this.props.store.activeStores.length > 0){
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
            driverTableHolder = <DriverTable dataForDriver={dataForDriver} />
        }

        var today = new Date();
        var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        return (
            <KanbeTemplate>
                <div className="driver-container">
                    <h1>{storeName}</h1>
                    <h5>{address}</h5>
                    <h3>{date}</h3>
                    {driverTableHolder}
                </div>
            </KanbeTemplate>
        )
    }
}

export default connect(mapStoreToProps)(withRouter(DriverPage));
