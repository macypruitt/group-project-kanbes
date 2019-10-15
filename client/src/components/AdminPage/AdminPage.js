import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid } from '@material-ui/core';
import StoreTable from './Tables/StoreTable';
import UserTable from './Tables/UserTable';
import SupplierTable from './Tables/SupplierTable';

import './AdminPage.css'

class AdminPage extends Component {

    render() {

        return (
            <Grid container spacing={3} className="admin-container">
                <Grid item xs={12}>
                    <h2>Admin Page</h2>
                </Grid>
                <Grid item xs={12}>
                    <h3>Stores</h3>
                    <StoreTable />
                </Grid>
                <Grid item xs={12}>
                    <h3>Users</h3>
                    <UserTable />
                </Grid>
                <Grid item xs={12}>
                    <h3>Suppliers</h3>
                    <SupplierTable />
                </Grid>
            </Grid >
        );
    }
}

export default connect(mapStoreToProps)(AdminPage);
