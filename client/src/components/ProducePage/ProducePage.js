import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';


class ProducePage extends Component {
    render(){
        return(
            <KanbeTemplate>
                <p>This is the produce page</p>

            </KanbeTemplate>
        )
    }
}

export default connect(mapStoreToProps) (ProducePage);