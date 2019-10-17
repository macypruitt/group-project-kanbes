import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';

//Will hold inventory information
class InventoryPage extends Component {
    render(){
        return(
            <KanbeTemplate>
                <p>This is the inventory page</p>
            </KanbeTemplate>
        )
    }
}

export default connect(mapStoreToProps) (InventoryPage);