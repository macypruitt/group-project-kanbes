import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import StoreTable from './Tables/StoreTable';
import UserTable from './Tables/UserTable';
import SupplierTable from './Tables/SupplierTable';

import './AdminPage.css'

class AdminPage extends Component {
    state = {
        heading: 'Class Component',
    };

    render() {


        return (
            <div className="admin-container">
                <h2>Admin Page</h2>

                <StoreTable />
                {/* <UserTable />
                <SupplierTable /> */}




            </div>
        );
    }
}

export default connect(mapStoreToProps)(AdminPage);
