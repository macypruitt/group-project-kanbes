import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_INVOICES" actions
function* fetchInvoice() {
  try {
    
    const response = yield axios.get('api/invoice');
   
    yield put({ type: 'SET_INVOICE', payload: response.data });
  } catch (error) {
    console.log('Prices get request failed', error);
  }
}


function* invoiceSaga() {
  yield takeLatest('FETCH_INVOICE', fetchInvoice);
}

export default invoiceSaga;