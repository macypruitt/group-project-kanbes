import { combineReducers } from 'redux';
import errors from './errors.reducer';
import loginMode from './loginMode.reducer';
import user from './user.reducer';
import users from './users.reducer';
import suppliers from './suppliers.reducer';
import stores from './stores.reducer';
import editDeliveryOrderStatus from './editDeliveryOrder.reducer';
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  users,
  suppliers,
  stores,
  editDeliveryOrderStatus
});

export default rootReducer;
