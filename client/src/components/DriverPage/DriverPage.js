import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';
import { withRouter } from 'react-router';


import DriverTable from './DriverTable';
import './DriverPage.css'

class DriverPage extends Component {
    
    state = {
        heading:'Store Name'
    };

    componentDidMount(){
        console.log(this.props.match.params.id)
        ////Saga dispatches GET, stores in reducer
        this.props.dispatch({type: 'FETCH_STORE_INVENTORY', payload: 1})
        ////setState using store name as header
        
        // this.props.dispatch({type: 'FETCH_STORE_INVENTORY', payload: });
    }

    render() {
console.log(this.props.store.storeInventory)

        ////this simulates the array data from the database query; it will be replaced with reducer data
        let dataForDriver=[];

        ////dataForDriver = this.props.store...........
        dataForDriver = [
            {   
                product_id: 1,
                product_name: 'Apples',
                product_sub_type: 'Big Red',
                standard_par: 12,
                last_par: 8,
                store_id: 3
            }
        ]

        ////driverTableHolder shows a table only if reducer is holding data
        let driverTableHolder;
        if(dataForDriver.length > 0){
            driverTableHolder = <DriverTable dataForDriver={dataForDriver} />
        }

      

        return (
            <KanbeTemplate>
                <div className="driver-container">
                <h2>{this.state.heading}</h2>
              
                {driverTableHolder}
            </div>
        

            </KanbeTemplate>
        )
    }
}

export default connect(mapStoreToProps)(withRouter(DriverPage));
