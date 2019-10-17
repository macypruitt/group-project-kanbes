import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';


import DriverTable from './DriverTable';
import './DriverPage.css'

class DriverPage extends Component {
    
    state = {
        storeName:'Food Mart, 8025 Hickman'
    };

    componentDidMount(){
        ////Saga dispatches GET, stores in reducer
        ////setState using store name as header
        
        // this.props.dispatch({type: 'FETCH_STORE_INVENTORY', payload: });
    }



    render() {
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
                store_id: 3,
            }
        ]


        ////driverTableHolder shows a table only if reducer is holding data
        let driverTableHolder;
        if(dataForDriver.length > 0){
            driverTableHolder = <DriverTable dataForDriver={dataForDriver} />
        }


        var today = new Date();
        var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      

        return (
            <KanbeTemplate>
                <div className="driver-container">
                <h2>{this.state.storeName}</h2>
                <h3>{date}</h3>
              
                {driverTableHolder}
            </div>
        

            </KanbeTemplate>
        )
    }
}

export default connect(mapStoreToProps)(DriverPage);
