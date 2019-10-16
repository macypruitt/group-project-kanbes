import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';


class PurchasePage extends Component {
    render(){
        return(
            <KanbeTemplate>
                <p>This is the purchase page</p>
            </KanbeTemplate>
        )
    }
}

export default connect(mapStoreToProps) (PurchasePage);