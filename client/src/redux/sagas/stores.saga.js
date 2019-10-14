import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchStores() {
  try {
    // const config = {
    //   headers: { 'Content-Type': 'application/json' },
    //   withCredentials: true,
    // };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('api/all/stores');
    // , config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
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
}

export default storesSaga;
