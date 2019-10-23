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
import LoginPage from '../LoginPage/LoginPage';
import ManagerPage from '../ManagerPage/ManagerPage'
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
import mapStoreToProps from '../../redux/mapStoreToProps';
import PerformancePage from '../../components/PerformancePage/PerformancePage'


class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'});
  }

  render() {
    

    return (
     
      
      <Router>
        
        <div>
          {/* <Nav /> */}
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/login" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={KanbeTemplate}
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

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            
           
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will be redirected to the authRedirect path provided. */}
            <ProtectedRoute
              exact
              path="/login"
              driverRedirect="/driver"
              managerRedirect="/manager"
              directorRedirect="/director"
              component={LoginPage}
            />
            {/*This route is used for getting the first store in from activeStores on page load */}
            <ProtectedRoute
              exact
              path="/driver"
              component={DriverPage}
            />
            {/*This route is used for specific information on click of nav bar*/}
            <ProtectedRoute
              exact
              path="/driver/:id"
              component={DriverPage}
            />
            <ProtectedRoute
              exact
              path="/manager"
              component={InvoicePage}
            />

            <ProtectedRoute
              exact
              path="/director"
              component={AdminPage}
            />
           
            <Route
            exact
            path="/director"
            component={AdminPage}
            component={PerformancePage}
            />
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

export default connect(mapStoreToProps)(App);
