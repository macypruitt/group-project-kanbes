import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

  /**
   * POST route for specific store inventory into incoming store
   */
  router.post('/incoming_store', (req: Request, res: Response, next: express.NextFunction): void => {

    const user_id: string = req.body.user_id;
    const product_id: string = req.body.product_id;
    const store_id: string = req.body.store_id;
    const last_modified: string | null = req.body.last_modified;
    const restocked: number = req.body.restocked;
    const supplier_id: string = req.body.supplier_id;
    const notes: string = req.body.notes;
    
    // last_modified is equal to kanbe_sell_date in database
    // restocked is equal to product_count in database
    const queryText: string = `INSERT INTO "incoming_store" ( "user_id", "product_id", "store_id", "kanbe_sell_date", "product_count", "supplier_id", "notes")
    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    pool.query(queryText, [user_id, product_id, store_id, last_modified, restocked, supplier_id, notes])
    .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log(`Error saving order to outgoing store: ${err}`);
        res.sendStatus(500)
      }
      );
  
  });

export default router;