import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// products Saga: will be fired on "FETCH_PRODUCTS" actions
function* fetchActiveProducts() {
  try {
 
    const response = yield axios.get('/api/allCurrentProducts');

    yield put({ type: 'SET_PRODUCTS', payload: response.data });
  } catch (error) {
    console.log('Products get request failed', error);
  }
}

//Saga to POST a Product to product table in the database
function* addProduct(action) {
  try {
    yield axios.post('/api/allCurrentProducts/newProduct', action.payload);
    yield put({type: 'FETCH_PRICES'});
  } catch (error) {
    console.log('Error with admin adding new product: ', error);
  }
}


function* productsSaga() {
  yield takeLatest('FETCH_PRODUCTS', fetchActiveProducts);
  yield takeLatest('ADD_PRODUCT', addProduct);
}

export default productsSaga;
