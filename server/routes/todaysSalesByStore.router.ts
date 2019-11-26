import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET route to get store inventory from database
 */
router.get('/:id', (req: Request, res: Response, next: express.NextFunction): void => {

    const queryText: string = `SELECT SUM(OS."sold_product_count" * "sold_price_per_unit") AS "Total Sales" FROM "outgoing_store" OS
    WHERE date("last_modified") = date(NOW())
    AND store_id = $1;`;


    const storeId: string = req.params.id;

    pool.query(queryText, [storeId])
        .then((result) => {
            res.send(result.rows)
        })
        .catch((err) => {
            console.log(`Error in GET today's sales: ${err}`);
            res.sendStatus(500)
        }
        );
});




export default router;