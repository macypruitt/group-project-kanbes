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
                            WHERE "stores"."id" = $1 
                            AND "last_modified"=(SELECT MAX("last_modified") FROM "outgoing_store");`;

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

export default router;