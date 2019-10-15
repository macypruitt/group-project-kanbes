import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import DriverTableRow from './DriverTableRow';

class DriverTable extends Component {
    state = {
        heading: 'Class Component',
    };

    
    render() {

        ////this prevents error if driver reducer data is unavailable
        let driverDataForRender = [];
        driverDataForRender = this.props.dataForDriver;
        if(driverDataForRender.length > 0){
            driverDataForRender = driverDataForRender.map((item, index) => {
                return <DriverTableRow key={index} data={item} />
            })
            
        }


        return (
            <div>
                <table className="driver-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Ideal Par</th>
                            <th>Last Par</th>
                            <th>Sold</th>
                            <th>Shrink</th>
                            <th>Notes</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(DriverTable);
