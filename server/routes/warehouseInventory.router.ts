import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * POST product to product table
 */
router.post('/incoming_store', (req: Request, res: Response, next: express.NextFunction): void => {
  const user_id: string = req.body.user_id;
  const product_id: string = req.body.product_id;
  const store_id: string = req.body.store_id;
  const last_modified: string | null = req.body.last_modified;
  const restocked: number = req.body.product_count;
  const supplier_id: string = req.body.supplier_id;
  const notes: string = req.body.notes;
  const sold_product_count: string = req.body.sold_product_count;
  const shrink_product_count: string = req.body.shrink_product_count;
  const standard_par: string = req.body.standard_par;
  const last_par: string = req.body.last_par;
  const sold_price_per_unit: number = req.body.sold_price_per_unit;
  const current_price_per_unit_id: string = req.body.current_price_per_unit_id;
  let outgoing_store_id: number;
  let incoming_store_id: number;

  let queryText: string = `INSERT INTO "incoming_store" ( "user_id", "product_id", "store_id", "kanbe_sell_date", "product_count", "supplier_id", "notes")
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "id";`;

  pool.query(queryText, [user_id, product_id, store_id, last_modified, restocked, supplier_id, notes])

    .then((response) => {
      console.log('inside first response', response.rows)
      incoming_store_id = response.rows[0].id; // something that is sitting in response

      queryText = `INSERT INTO "outgoing_store" ( "store_id", "product_id", "user_id", "supplier_id", "last_modified", "sold_product_count", "shrink_product_count", "standard_par", "last_par","current_price_per_unit_id", "sold_price_per_unit", "notes")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING "id";`;

      pool.query(queryText, [store_id, product_id, user_id, supplier_id, last_modified, sold_product_count, shrink_product_count, standard_par, last_par, current_price_per_unit_id, sold_price_per_unit, notes])
        .then((response2) => {
          outgoing_store_id = response2.rows[0].id;

          queryText = `INSERT INTO "store_inventory_junction" ( "incoming_inventory_id", "outgoing_inventory_id")
              VALUES ($1, $2)`;
          pool.query(queryText, [incoming_store_id, outgoing_store_id])
            .then((response3) => {
              res.sendStatus(201);
              //closing first query
            }).catch((err) => {
              console.log(`Error posting store_inventory_junction: ${err}`);
              res.sendStatus(500)
            })


          //closing second query
        })
        .catch((err) => {
          console.log(`Error posting to outgoing_store: ${err}`);
          res.sendStatus(500)
        });

      //closing first query
    })
    .catch((err) => {
      console.log(`Error posting to incoming_store: ${err}`);
      res.sendStatus(500)
    });
  //closing POST
});


/**
 * PUT route for specific store inventory into incoming store
 */
router.put('/incoming_store/:id', (req: Request, res: Response, next: express.NextFunction): void => {


  const user_id: string = req.body.user_id;
  const product_id: string = req.body.product_id;
  const store_id: string = req.body.store_id;
  const kanbe_sell_date: string | null = req.body.last_modified;
  const product_count: string = req.body.product_count;
  const supplier_id: string = req.body.supplier_id;
  const notes: string = req.body.notes;

  const id: string = req.params.id;
  const queryText: string = `UPDATE "incoming_store" SET "user_id" = $1, "product_id" = $2, "store_id" = $3, 
                    "kanbe_sell_date" = $4, "product_count" = $5, "supplier_id" = $6,  "notes" = $7
                    WHERE "id" = $8;`;

  pool.query(queryText, [user_id, product_id, store_id, kanbe_sell_date, product_count, supplier_id, notes, id])
    .then(() => { res.sendStatus(201) })
    .catch((err) => {
      console.log(`Error updating outgoing_store: ${err}`);
      res.sendStatus(500)
    }
    );
});

export default router;