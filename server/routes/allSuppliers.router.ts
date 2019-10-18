import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

//get all suppliers
router.get('/', (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText: string = `SELECT * FROM "suppliers"`;
    pool.query(queryText)
      .then((result) => res.send(result.rows))
      .catch((err) => {
        console.log(`Error in GET all suppliers: ${err}`);
        res.sendStatus(500)}
      );
});

//post new supplier
router.post('/newSupplier', (req: Request, res: Response, next: express.NextFunction): void => {
  const supplier_name: string = req.body.supplier_name;
  const contact_name: string = req.body.contact_name;
  const contact_number: string | null = req.body.contact_number;
  const address: string = req.body.address;

  const queryText: string = `INSERT INTO "suppliers" (supplier_name, contact_name, contact_number, address) VALUES ($1, $2, $3, $4)`;
  pool.query(queryText, [supplier_name, contact_name, contact_number, address])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log(`Error saving supplier to database: ${err}`);
      res.sendStatus(500)}
    );
});

//edit current supplier
router.put('/editSupplier/:id', (req: Request, res: Response, next: express.NextFunction): void => {
<<<<<<< HEAD
  const supplier_name: string = req.body.supplier_name;
=======
    const supplier_name: string = req.body.supplier_name;
>>>>>>> develop
  const contact_name: string = req.body.contact_name;
  const contact_number: string | null = req.body.contact_number;
  const address: string = req.body.address;
  const id: string = req.params.id;

<<<<<<< HEAD
  const queryText: string = `UPDATE "suppliers" SET "name"=$1, "contact_name"=$2, "contact_number"=$3, "address"=$4 WHERE id=$5 `;
=======
  const queryText: string = `UPDATE "suppliers" SET "supplier_name"=$1, "contact_name"=$2, "contact_number"=$3, "address"=$4 WHERE id=$5 `;
>>>>>>> develop
  pool.query(queryText, [supplier_name, contact_name, contact_number, address, id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log(`Error editing supplier: ${err}`);
      res.sendStatus(500)}
    );
});

export default router;