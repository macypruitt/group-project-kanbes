import passport from 'passport';
import pool from '../modules/pool';
import { comparePassword } from '../modules/encryption';
import { Strategy } from 'passport-local';

passport.serializeUser((user: any, done: any): void => {
  done(null, user.id);
});

passport.deserializeUser((id: any, done: any): void => {
  pool.query('SELECT * FROM "user" WHERE id = $1', [id]).then((result: any): void => {
    const user = result && result.rows && result.rows[0];

    if (user) {
      delete user.password;
      done(null, user);
    } else {
      done(null, null);
    }
  }).catch((error: string): void => {
    console.log(`Error with query during deserializing user ${error}`);
    done(error, null);
  });
});

passport.use('local', new Strategy((username: string, password: string, done: Function): void => {
  pool.query('SELECT * FROM "user" WHERE username = $1', [username])
    .then((result: any) => {
      const user = result && result.rows && result.rows[0];
      if (user && comparePassword(password, user.password)) {
        done(null, user);
      } else {
        done(null, null);
      }
    }).catch((error: any) => {
      console.log(`Error with query for user ${error}`);
      done(error, null);
    });
}));

export default passport;