import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid } from '@material-ui/core';

import './PerformancePage.css'
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';

class PerformancePage extends Component {

    render() {

        return (
            <KanbeTemplate>   
                <Grid container spacing={3} className="admin-container">
                    <Grid item xs={12}>
                        <h2>Kanbe's Performance Metrics</h2>
                    </Grid>
                   
                </Grid >
            </KanbeTemplate>
        );
    }
}

export default connect(mapStoreToProps)(PerformancePage);
