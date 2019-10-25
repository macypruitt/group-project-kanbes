import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';
// import Chart from './Chart';

class DirectorPage extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {
        return (

            <KanbeTemplate>
                <div>
                    {/* <Chart /> */}
                </div>
            </KanbeTemplate>

        );
    }
}

export default connect(mapStoreToProps)(DirectorPage);
