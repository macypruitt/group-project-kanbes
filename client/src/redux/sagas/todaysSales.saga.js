import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_INVOICES" actions
function* fetchTodaysSales(action) {
  try {
    const response = yield axios.get(`/api/todaysSales/${action.payload}`);
   
    yield put({ type: 'SET_TODAYS_SALES', payload: response.data });
  } catch (error) {
    console.log('Todays sales get request failed', error);
  }
}


function* todaysSalesSaga() {
  yield takeLatest('FETCH_TODAYS_SALES', fetchTodaysSales);
}

export default todaysSalesSaga;