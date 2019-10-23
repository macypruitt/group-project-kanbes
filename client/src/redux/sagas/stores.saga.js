import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchStores() {
  try {
 
    const response = yield axios.get('api/all/stores');

    yield put({ type: 'SET_STORES', payload: response.data });
  } catch (error) {
    console.log('Stores get request failed', error);
  }
}

function* fetchActiveStores() {
  try {

    const response = yield axios.get('api/all/stores/active');

    yield put({ type: 'SET_STORES', payload: response.data });
  } catch (error) {
    console.log('Stores get request failed', error);
  }
}

function* putStore(action) {
  try {
    yield axios.put(`api/all/stores/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_STORES' });
  } catch (err) {
    console.log('PUT store error: ', err)
  }
}

function* putDeliveryOrders(action) {
  try {
    yield axios.put('api/all/stores/update/DeliveryRoutes', action.payload);
    yield put({ type: 'FETCH_STORES' });
  } catch (err) {
    console.log('PUT store error: ', err)
  }
}

function* postStore(action) {
  try {
    yield axios.post('api/all/stores', action.payload);
    yield put({ type: 'FETCH_STORES' });
  } catch (err) {
    console.log('POST store error: ', err)
  }
}


function* storesSaga() {
  yield takeLatest('FETCH_STORES', fetchStores);
  yield takeLatest('PUT_STORE', putStore);
  yield takeLatest('POST_STORE', postStore);
  yield takeLatest('UPDATE_DELIVERY_ROUTES', putDeliveryOrders);
  yield takeLatest('FETCH_ACTIVE_STORES', fetchActiveStores);
}

export default storesSaga;
