import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUsers() {
  try {
    // const config = {
    //   headers: { 'Content-Type': 'application/json' },
    //   withCredentials: true,
    // };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('api/allUsers');
    // , config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USERS', payload: response.data });
  } catch (error) {
    console.log('Users get request failed', error);
  }
}

// Saga to POST a User to the database
function* addUser(action) {
  try {
    yield axios.post('/api/allUsers/newUser', action.payload);
    yield put({type: 'FETCH_USERS'});
  } catch (error) {
    console.log('Error with admin adding new user: ', error);
  }
}

// Saga to update user data in database
function* updateUser(action) {
  try {
    yield axios.put(`/api/allUsers/editUser/${action.payload.id}`, action.payload);
    yield put({type: 'FETCH_USERS'});
  } catch (error) {
    console.log('Error with admin editing user: ', error);
  }
}

function* usersSaga() {
  yield takeLatest('FETCH_USERS', fetchUsers);
  yield takeLatest('ADD_USER', addUser);
  yield takeLatest('UPDATE_USER', updateUser);
}

export default usersSaga;
