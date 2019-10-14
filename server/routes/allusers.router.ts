import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';
import {encryptPassword} from '../modules/encryption';

const router: express.Router = express.Router();

//get all users
router.get('/', (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText: string = `SELECT * FROM "user"`;
    pool.query(queryText)
      .then((result) => res.send(result.rows))
      .catch((err) => {
        console.log(`Error in GET all users: ${err}`);
        res.sendStatus(500)}
      );
});

//post new user
router.post('/newUser', (req: Request, res: Response, next: express.NextFunction): void => {
  const username: string = req.body.username;
  const password: string = encryptPassword(req.body.password);
  // const username: string = req.body.username;
  // const password: string = req.body.password;
  const firstName: string = req.body.first_name;
  const lastName: string = req.body.last_name;
  const email: string = req.body.email;
  const role: string = req.body.role;
  const adminLevel: string = req.body.admin_level;

  const queryText: string = `INSERT INTO "user" (first_name, last_name, username, email, password, role, admin_level) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  pool.query(queryText, [firstName, lastName, username, email, password, role, adminLevel])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log(`Error saving user to database: ${err}`);
      res.sendStatus(500)}
    );
});

//edit current user
router.put('/editUser/:id')

export default router;