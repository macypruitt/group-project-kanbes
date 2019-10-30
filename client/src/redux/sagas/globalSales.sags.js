import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_INVOICES" actions
function* fetchSales(action) {
  try {
    const response = yield axios.get(`api/globalSales`);
   
    yield put({ type: 'SET_GLOBAL_SALES', payload: response.data });
  } catch (error) {
    console.log('Sales get request failed', error);
  }
}


function* invoiceSaga() {
  yield takeLatest('FETCH_GLOBAL_SALES', fetchSales);
}

export default invoiceSaga;