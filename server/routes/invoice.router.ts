import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET route to calculate invoice 
 */

router.get('/:id', (req: Request, res: Response, next: express.NextFunction): void => {


    const startDateTime:string = '';
    const endDateTime:string = '';
    const storeId: string = '';

    const queryText: string = `SELECT OS.store_id, OS.product_id, OS.current_price_per_unit_id, OS.sold_product_count, 
                            current_price_per_unit, OS.sold_price_per_unit, SUM(OS.sold_product_count) AS "Total Sold", 
                            SUM(OS."sold_product_count" * "sold_price_per_unit") AS "Total Sales" FROM "outgoing_store" OS
                            JOIN "user" ON "user"."id" = OS."user_id"
                            JOIN "products" ON "products"."id" = OS."product_id"
                            JOIN "stores" ON "stores"."id" = OS."store_id"
                            JOIN "suppliers" ON "suppliers"."id" = OS."supplier_id"
                            JOIN "current_product_prices" ON "current_product_prices"."id" = OS."current_price_per_unit_id"
                            WHERE "last_modified" BETWEEN $1 AND $2 
                            AND OS."product_id" = OS."current_price_per_unit_id"
                            AND OS.store_id = $3
                            GROUP BY OS.store_id, OS.product_id, OS.current_price_per_unit_id, current_price_per_unit,
                            OS.sold_product_count, OS.sold_price_per_unit;`;

    pool.query(queryText, [startDateTime, endDateTime, storeId])
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows)
        })
        .catch((err) => {
            console.log(`Error in GET for invoice: ${err}`);
            res.sendStatus(500)
        }
        );

});
/**
 * POST date range to invoices table in database
 */


export default router;