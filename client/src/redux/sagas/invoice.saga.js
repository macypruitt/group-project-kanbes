import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_INVOICES" actions
function* fetchInvoice(action) {
  try {
    const response = yield axios.get(`api/invoice/invoiceData/${action.payload}`);
   
    yield put({ type: 'SET_INVOICE', payload: response.data });
  } catch (error) {
    console.log('Prices get request failed', error);
  }
}

//worker Saga: will be fired on "FETCH_INVOICES" actions
function* fetchInvoiceParameters(action) {
  try {
    const response = yield axios.get(`api/invoice/invoiceParameters`);
   
    yield put({ type: 'SET_INVOICE_PARAMETERS', payload: response.data });
  } catch (error) {
    console.log('Invoice Parameters get request failed', error);
  }
}

// will be fired on "POST_INVOICES" actions
function* postInvoice(action) {
  console.log('in post Invoice')
  try {
    const response = yield axios.post(`api/invoice/addInvoice`, action.payload);
   
    yield put({ type: 'FETCH_INVOICE_PARAMETERS', payload: response.data });
  } catch (error) {
    console.log('Prices get request failed', error);
  }
}


function* invoiceSaga() {
  yield takeLatest('FETCH_INVOICE', fetchInvoice);
  yield takeLatest('POST_INVOICE', postInvoice);
  yield takeLatest('FETCH_INVOICE_PARAMETERS', fetchInvoiceParameters)
}

export default invoiceSaga;