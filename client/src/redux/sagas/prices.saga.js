import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_PRICES" actions
function* fetchPrices() {
  try {
    
    const response = yield axios.get('api/allCurrentPrices');
   
    yield put({ type: 'SET_PRICES', payload: response.data });
  } catch (error) {
    console.log('Prices get request failed', error);
  }
}


// Saga to update product price in current_product_prices table in database
function* updatePrice(action) {
  try {
    yield axios.put(`/api/allCurrentPrices/editPrice/${action.payload.id}`, action.payload);
    yield put({type: 'FETCH_PRICES'});
  } catch (error) {
    console.log('Error with admin editing price: ', error);
  }
}

function* pricesSaga() {
  yield takeLatest('FETCH_PRICES', fetchPrices);
  yield takeLatest('UPDATE_PRICE', updatePrice);
}

export default pricesSaga;
