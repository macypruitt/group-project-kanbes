import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';
import { encryptPassword } from '../modules/encryption';
import generatePassword from 'password-generator';
// @ts-ignore
import * as nodemailer from 'nodemailer';
require('dotenv').config()

const router: express.Router = express.Router();
const USERNAME: string = process.env.USERNAME != null ? process.env.USERNAME : '';
const PASSWORD: string = process.env.PASSWORD != null ? process.env.PASSWORD: '';

console.log('username ', process.env.USERNAME, ' password ', process.env.PASSWORD)

//get all users
router.get('/', (req: Request, res: Response, next: express.NextFunction): void => {
  const queryText: string = `SELECT * FROM "user"`;
  pool.query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`Error in GET all users: ${err}`);
      res.sendStatus(500)
    }
    );
});

//post new user and create password and send to user email
router.post('/newUser', (req: Request, res: Response, next: express.NextFunction): void => {
  const newPassword: string = generatePassword(8, false);

  // store password in database
  const username: string = req.body.username;
  const password: string = encryptPassword(newPassword);
  const firstName: string = req.body.first_name;
  const lastName: string = req.body.last_name;
  const email: string | null = req.body.email;
  const role: string = req.body.role;
  const adminLevel: string = req.body.admin_level;

  const queryText: string = `INSERT INTO "user" (first_name, last_name, username, email, password, role, admin_level) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  pool.query(queryText, [firstName, lastName, username, email, password, role, adminLevel])
    .then(() => {
      // then email it!
      mail(newPassword, email);

      // Whatever, just respond. Or move this into a function away from an endpoint and then no response needed.
      res.send(newPassword);
    }
    )
    .catch((err) => {
      console.log(`Error saving user to database: ${err}`);
      res.sendStatus(500)
    }
    );

});

// async..await is not allowed in global scope, must use a wrapper
async function mail(password: string, userEmail: any) {

  let transporter: nodemailer.Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'login',
      user: USERNAME,
      pass: PASSWORD
    }
  });

  let info = await transporter.sendMail({
    from: process.env.FROM, // sender address
    to: userEmail, // list of receivers
    subject: 'Your password', // Subject line
    text: password, // plain text body
    html: `
      <p>Your new password: ${password} for Kanbe's Market application</p>
      ` // html body
  });
}



//edit current user
router.put('/editUser/:id', (req: Request, res: Response, next: express.NextFunction): void => {
  const username: string = req.body.username;
  // const password: string = encryptPassword(req.body.password);
  const firstName: string = req.body.first_name;
  const lastName: string = req.body.last_name;
  const email: string | null = req.body.email;
  const role: string = req.body.role;
  const adminLevel: string = req.body.admin_level;
  const id: string = req.params.id;

  const queryText: string = `UPDATE "user" SET "first_name"=$1, "last_name"=$2, "username"=$3, "email"=$4, "role"=$5, "admin_level"=$6 WHERE id=$7 `;
  pool.query(queryText, [firstName, lastName, username, email, role, adminLevel, id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log(`Error editing user: ${err}`);
      res.sendStatus(500)
    }
    );
});

export default router;