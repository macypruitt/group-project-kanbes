import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetchStoreInventory Saga: will be fired on "FETCH_STORE_INVENTORY" actions
function* fetchStoreInventory(action) {
  try {
    const response = yield axios.get(`api/store/inventory/${action.payload}`);
    // places server's response data in reducer
    yield put({ type: 'SET_STORE_INVENTORY', payload: response.data });
  } catch (error) {
    console.log('Stores get request failed', error);
  }
}

function* postOutgoingStore(action) {
  try {
    yield axios.post('api/store/inventory/outgoing_store', action.payload);
    // yield put({ type: 'FETCH_STORE_INVENTORY', payload: action.payload.id });
    yield put({ type: 'FETCH_STORE_INVENTORY', payload: action.payload.store_id });
  } catch (err) {
    console.log('POST outgoing_store error: ', err)
  }
}

function* postIncomingStore(action) {
  try {
    yield axios.post('/api/warehouse/inventory/incoming_store', action.payload);
    // yield put({ type: 'FETCH_STORE_INVENTORY', payload: action.payload.id });
        yield put({ type: 'FETCH_STORE_INVENTORY', payload: action.payload.store_id });
  } catch (err) {
    console.log('POST incoming_store error: ', err)
  }
}

function* putOutgoingStore(action) {
  try {
    yield axios.put(`api/store/inventory/outgoing_store/${action.payload.outgoing_inventory_id}`, action.payload);
    // yield put({ type: 'FETCH_STORE_INVENTORY', payload: action.payload.id });
        yield put({ type: 'FETCH_STORE_INVENTORY', payload: action.payload.store_id });
  } catch (err) {
    console.log('PUT outgoing_store error: ', err)
  }
}

function* putIncomingStore(action) {
  try {
    yield axios.put(`/api/warehouse/inventory/incoming_store/${action.payload.incoming_inventory_id}`, action.payload);
    // yield put({ type: 'FETCH_STORE_INVENTORY', payload: action.payload.id });
        yield put({ type: 'FETCH_STORE_INVENTORY', payload: action.payload.store_id });
  } catch (err) {
    console.log('PUT incoming_store error: ', err)
  }
}


function* storeInventorySaga() {
  yield takeLatest('FETCH_STORE_INVENTORY', fetchStoreInventory);
  yield takeLatest('ADD_OUTGOING_STORE', postOutgoingStore);
  yield takeLatest('UPDATE_OUTGOING_STORE', putOutgoingStore);
  yield takeLatest('ADD_INCOMING_STORE', postIncomingStore);
  yield takeLatest('UPDATE_INCOMING_STORE', putIncomingStore);
}

export default storeInventorySaga;