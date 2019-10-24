import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_INVOICES" actions
function* fetchInvoice(action) {
  try {
    const response = yield axios.get(`api/invoice/${action.payload}`);
   
    yield put({ type: 'SET_INVOICE', payload: response.data });
  } catch (error) {
    console.log('Prices get request failed', error);
  }
}

// will be fired on "POST_INVOICES" actions
function* postInvoice(action) {
  try {
    const response = yield axios.post(`api/invoice`);
   
    yield put({ type: 'SET_INVOICE', payload: response.data });
  } catch (error) {
    console.log('Prices get request failed', error);
  }
}


function* invoiceSaga() {
  yield takeLatest('FETCH_INVOICE', fetchInvoice);
  yield takeLatest('POST_INVOICES', postInvoice)
}

export default invoiceSaga;