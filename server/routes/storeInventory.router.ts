import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET route to get store inventory from database
 */
router.get('/:id', (req: Request, res: Response, next: express.NextFunction): void => {
    
    const queryText: string = `SELECT * FROM "outgoing_store"
                            JOIN "user" ON "user"."id" = "outgoing_store"."user_id"
                            JOIN "products" ON "products"."id" = "outgoing_store"."product_id"
                            JOIN "stores" ON "stores"."id" = "outgoing_store"."store_id"
                            JOIN "suppliers" ON "suppliers"."id" = "outgoing_store"."supplier_id"
                            JOIN "current_product_prices" ON "outgoing_store"."current_price_per_unit_id" = "current_product_prices"."id"
                            WHERE "stores"."id" = $1;`
                            // AND "last_modified"=(SELECT MAX("last_modified") FROM "outgoing_store")`;
                           

    const storeId: string = req.params.id;

    pool.query(queryText, [storeId])
        .then((result) => {
        console.log(result.rows)
        res.send(result.rows)})
        .catch((err) => {
            console.log(`Error in GET store inventory: ${err}`);
            res.sendStatus(500)
        }
        );
});

/**
 * POST route for specific store inventory
 */
<<<<<<< HEAD
=======
router.post('/outgoing_store', (req: Request, res: Response, next: express.NextFunction): void => {

    const store_id: string = req.body.store_id;
    const product_id: string = req.body.product_id;;
    const user_id: string = req.body.user_id;
    const supplier_id: string = req.body.supplier_id;
    const last_modified: string | null = req.body.last_modified;
    const sold_product_count: string = req.body.sold_product_count;
    const shrink_product_count: string = req.body.shrink_product_count;
    const standard_par: string = req.body.standard_par;
    const last_par: string = req.body.last_par;
    const notes: string = req.body.notes;
    const sold_price_per_unit: number= req.body.sold_price_per_unit;
    const current_price_per_unit_id: string = req.body.current_price_per_unit_id;
  
    const queryText: string = `INSERT INTO "outgoing_store" ( "store_id", "product_id", "user_id", "supplier_id", "last_modified", "sold_product_count", "shrink_product_count", "standard_par", "last_par","current_price_per_unit_id", "sold_price_per_unit", "notes")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
    pool.query(queryText, [store_id, product_id, user_id, supplier_id, last_modified, sold_product_count, shrink_product_count, standard_par, last_par, current_price_per_unit_id, sold_price_per_unit,  notes])
    .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log(`Error saving order to outgoing store: ${err}`);
        res.sendStatus(500)
      }
      );
  
  });
  
>>>>>>> develop

export default router;