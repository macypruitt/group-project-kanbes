import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';


class SupplierPage extends Component {
    render(){
        return(
            <KanbeTemplate>
                <p>This is the Supplier page</p>

            </KanbeTemplate>
        )
    }
}

export default connect(mapStoreToProps) (SupplierPage);