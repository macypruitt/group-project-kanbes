import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET data to populate global sales
 */
router.get('/', (req: Request, res: Response, next: express.NextFunction): void => {

    const queryText: string = `SELECT OS.store_id, OS.last_modified, OS.product_id,OS.supplier_id, OS.current_price_per_unit_id, OS.sold_product_count, 
                            current_price_per_unit, OS.sold_price_per_unit,product_name, SUM(OS.sold_product_count) AS "Total Sold", 
                            SUM(OS."sold_product_count" * "sold_price_per_unit") AS "Total Sales" FROM "outgoing_store" OS
                            JOIN "user" ON "user"."id" = OS."user_id"
                            JOIN "products" ON "products"."id" = OS."product_id"
                            JOIN "stores" ON "stores"."id" = OS."store_id"
                            JOIN "suppliers" ON "suppliers"."id" = OS."supplier_id"
                            JOIN "current_product_prices" ON "current_product_prices"."id" = OS."current_price_per_unit_id"
                            AND OS."product_id" = OS."current_price_per_unit_id"
                            GROUP BY OS.store_id,OS.last_modified, OS.product_id, OS.current_price_per_unit_id, current_price_per_unit,
                            OS.sold_product_count, OS.sold_price_per_unit, OS.supplier_id, product_name;`;



    pool.query(queryText)
        .then((result) => {
         
            res.send(result.rows)
        })
        .catch((err) => {
            console.log(`Error in GET for global sales: ${err}`);
            res.sendStatus(500)
        }
        );

});


export default router;