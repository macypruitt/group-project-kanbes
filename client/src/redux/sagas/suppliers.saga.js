import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// GET for to grab all suppliers in database: will be fired on "FETCH_SUPPLIERS" actions
function* fetchSuppliers() {
  try {
    // const config = {
    //   headers: { 'Content-Type': 'application/json' },
    //   withCredentials: true,
    // };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('api/allSuppliers');
    // , config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_SUPPLIERS', payload: response.data });
  } catch (error) {
    console.log('Suppliers get request failed', error);
  }
}

// Saga to POST a supplier to database. Fired off by 'ADD_SUPPLIER'
function* addSupplier(action) {
  try {
    yield axios.post('/api/allSuppliers/newSupplier', action.payload);
    yield put({type: 'FETCH_SUPPLIERS'});
  } catch (error) {
    console.log('Error with admin adding new supplier: ', error);
  }
} 

// Saga to update supplier data in database. Fired off by 'UPDATE_SUPPLIER'
function* updateSupplier(action) {
  try {
    yield axios.put(`/api/allSuppliers/editSupplier/${action.payload.id}`, action.payload);
    yield put({type: 'FETCH_SUPPLIERS'});
  } catch (error) {
    console.log('Error with admin editing supplier: ', error);
  }
}

function* suppliersSaga() {
  yield takeLatest('FETCH_SUPPLIERS', fetchSuppliers);
  yield takeLatest('ADD_SUPPLIER', addSupplier);
  yield takeLatest('UPDATE_SUPPLIER', updateSupplier);
}

export default suppliersSaga;
