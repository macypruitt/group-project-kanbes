import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
// import  Fab  from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import DriverTableRow from './DriverTableRow';
import { Button } from '@material-ui/core';

class DriverTable extends Component {
    state = {
        isAdding: false,
        itemsToSubmit: []
    };

    clickAdd = (event) => {
        ////'Add Product' button changes state, triggering render of new row
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

          ////adds a new row that is ready to be edited
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
                            <th>Sub-type</th>
                            <th>Standard Par</th>
                            <th>Last Par</th>
                            <th>Sold</th>
                            <th>Shrink</th>
                            <th># Re-Stocked</th>
                            <th>Notes</th>
                            <th>Last Modified</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {driverDataForRender}
                    {newRow}
                    </tbody>
                </table>
                <div>
                    <Button className="add-button" onClick={this.clickAdd}>
                        <AddIcon />
                    </Button>
                </div>
                <br />
            </div>
        );
    }
}

export default connect(mapStoreToProps)(DriverTable);
