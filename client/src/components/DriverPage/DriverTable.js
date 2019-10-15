import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import DriverTableRow from './DriverTableRow';

class DriverTable extends Component {
    state = {
        isAdding: false
    };

    clickAdd = (event) => {
        this.setState({
            ...this.state,
            isAdding: !this.state.isAdding
        })
    }

    render() {

        ////this prevents error if driver reducer data is unavailable
        let driverDataForRender = [];
        driverDataForRender = this.props.dataForDriver;

        ////if reducer holds data, map it into rows of the table
        if(driverDataForRender.length > 0){
            driverDataForRender = driverDataForRender.map((item, index) => {
                return <DriverTableRow key={index} item={item} />
            })  
        }

          ////adds a new row when 'Add Store' button is clicked
          let newRow;
          if(this.state.isAdding){
              const emptyItem = {}
              newRow = <DriverTableRow editable={true} addable={true} item={emptyItem} clickAddStore={this.clickAdd}/>
          }

        return (
            <div>
                <table className="driver-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Standard Par</th>
                            <th>Last Par</th>
                            <th>Sold</th>
                            <th>Shrink</th>
                            <th>Notes</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {driverDataForRender}

                    {newRow}
                    </tbody>
                </table>

                <button onClick={this.clickAdd}>Add Store</button>

                <br />

                <button onClick={this.clickAdd}>Export Weekly Invoice</button>

            </div>
        );
    }
}

export default connect(mapStoreToProps)(DriverTable);
