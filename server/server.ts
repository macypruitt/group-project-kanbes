import express from 'express';
import bodyParser from 'body-parser';
import sessionMiddleware from './modules/session-middleware';
import passport from './strategies/user.strategy';
import userRouter from './routes/user.router';
import allUsersRouter from './routes/allusers.router';
import allSuppliersRouter from './routes/allSuppliers.router';
import allStoresRouter from './routes/allStores.router';
import storeInventoryRouter from './routes/storeInventory.router';
import pricesRouter from './routes/allPrices.router';
import warehouseInventoryRouter from './routes/warehouseInventory.router';
import invoiceRouter from './routes/invoice.router';
import currentProducts from './routes/allCurrentProducts.router';
import globalSales from './routes/globalSales.router';
import todaysSales from './routes/todaysSalesByStore.router';
require('dotenv').config();

const app: any = express();
// const allUsersRouter = require('./routes/allusers.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/allUsers', allUsersRouter);
app.use('/api/allSuppliers', allSuppliersRouter);
app.use('/api/all/stores', allStoresRouter);
app.use('/api/store/inventory', storeInventoryRouter);
app.use('/api/allCurrentPrices', pricesRouter);
app.use('/api/warehouse/inventory', warehouseInventoryRouter);
app.use('/api/invoice', invoiceRouter);
app.use('/api/allCurrentProducts', currentProducts);
app.use('/api/globalSales', globalSales);
app.use('/api/todaysSales', todaysSales);


// Serve static files
app.use(express.static('client/build'));

// App Set //
const PORT: number | string = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, (): void => {
  console.log(`So awesome. Much wow. Listening on port: ${PORT}`);
});

export default app;