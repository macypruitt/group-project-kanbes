import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import DriverTable from './DriverTable';
import DriverTableRow from './DriverTableRow';

class DriverPage extends Component {
    
    
    state = {
        heading: 'Class Component',
    };


    render() {
        ////this simulates the array data from the database query
        let dataForDriver=[];
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
            ////data from reducer is passed to table as props
        }


        return (
            <div className="driver-container">
                <h2>{this.state.heading}</h2>
                {driverTableHolder}
            </div>
        );
    }
}

export default connect(mapStoreToProps)(DriverPage);
