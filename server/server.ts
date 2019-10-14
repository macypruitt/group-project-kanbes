import express from 'express';
import bodyParser from 'body-parser';
import sessionMiddleware from './modules/session-middleware';
import passport from './strategies/user.strategy';
import userRouter from './routes/user.router';
import allUsersRouter from './routes/allusers.router';
import allSuppliersRouter from './routes/allSuppliers.router';
import allStoresRouter from './routes/allStores.router';

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

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT: number | string = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, (): void => {
  console.log(`So awesome. Much wow. Listening on port: ${PORT}`);
});

export default app;