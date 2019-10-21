import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import usersSaga from './users.saga';
import suppliersSaga from './suppliers.saga';
import storesSaga from './stores.saga';
import storeInventorySaga from './storeInventory.saga';
import pricesSaga from './prices.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    usersSaga(),
    suppliersSaga(),
    storesSaga(),
    storeInventorySaga(),
    pricesSaga()
  ]);
}
