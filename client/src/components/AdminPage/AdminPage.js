import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import StoreTable from './Tables/StoreTable';
import UserTable from './Tables/UserTable';
import SupplierTable from './Tables/SupplierTable';

import './AdminPage.css'

class AdminPage extends Component {
    
    render() {

        return (
            <div className="admin-container">
                
                <h2>Admin Page</h2>
                
                <h3>Stores</h3>
                <StoreTable />
                <br />
                
                <h3>Users</h3>
                <UserTable />
                <br />
                
                <h3>Suppliers</h3>
                <SupplierTable />
            </div>
        );
    }
}

export default connect(mapStoreToProps)(AdminPage);
