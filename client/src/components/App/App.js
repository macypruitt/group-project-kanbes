import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

// import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import AdminPage from '../AdminPage/AdminPage';
import KanbeTemplate from '../KanbeTemplate/KanbeTemplate';
import InvoicePage from '../InvoicePage/InvoicePage';
import InventoryPage from '../InventoryPage/InventoryPage';
import PurchasePage from '../PurchasePage/PurchasePage';
import ProducePage from '../ProducePage/ProducePage';
import SupplierPage from '../SupplierPage/SupplierPage';
import StorePage from '../StorePage/StorePage';

import DriverPage from '../DriverPage/DriverPage';
import DriverViewModal from '../DriverViewModal/DriverViewModal';


class App extends Component {


  render() {
    return (
      
      <Router>
        
        <div>
          {/* <Nav /> */}
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={KanbeTemplate}
            />
            <Route
              exact
              path="/home"
              component={LoginPage}
            />
            <Route
              exact
              path="/admin"
              component={AdminPage}
            />
            <Route
              exact
              path="/invoice"
              component={InvoicePage}
            />
            <Route
              exact
              path="/inventory"
              component={InventoryPage}
            />
            <Route
              exact
              path="/purchase"
              component={PurchasePage}
            />
            <Route
              exact
              path="/store"
              component={StorePage}
            />
            <Route
              exact
              path="/supplier"
              component={SupplierPage}
            />
            <Route
              exact
              path="/produce"
              component={ProducePage}
            />
            <Route
              exact
              path="/driver/:id"
              component={DriverPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              exact
              path="/admin"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will be redirected to the authRedirect path provided. */}
            <ProtectedRoute
              exact
              path="/login"
              authRedirect="/admin"
              component={LoginPage}
            />
            <ProtectedRoute
              exact
              path="/registration"
              authRedirect="/admin"
              component={RegisterPage}
            />
            {/* <Route
            exact
            path="/driver"
            component={DriverView}
            /> */}
            <Route
            exact 
            path="/modal"
            component={DriverViewModal}
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      
    </Router>
  )}
}

export default connect()(App);
