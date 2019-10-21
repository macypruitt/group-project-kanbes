import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET route to get all stores from database
 */
router.get('/', (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText: string = `SELECT * FROM "current_product_prices"
                            JOIN "products" ON "current_product_prices"."product_id" = "products"."id" 
                            ORDER BY "products"."product_name" ASC;`;
    pool.query(queryText)
        .then((result) => res.send(result.rows))
        .catch((err) => {
            console.log(`Error in GET all prices: ${err}`);
            res.sendStatus(500)
        }
        );
});

/**
 * POST product to product table
 */
router.post('/newProduct', (req: Request, res: Response, next: express.NextFunction): void => {
    const product_name: string = req.body.product_name;
    const product_sub_type: string = req.body.product_sub_type;
    const current_price_per_unit: string = req.body.current_price_per_unit;
    const status: string = req.body.status;

    let queryText: string = `INSERT INTO "products" ("product_name", "product_sub_type")
                                VALUES($1, $2) RETURNING "id";`;

    pool.query(queryText, [product_name, product_sub_type])
        .then((response) => {

            const product_id = response.rows[0].id; // something that is sitting in response
            queryText = `INSERT INTO "current_product_prices" ("product_id", "current_price_per_unit", "status")
                                VALUES($1, $2, $3);`;

            pool.query(queryText, [product_id, current_price_per_unit, status])
                .then(() => { res.sendStatus(201) })
                .catch((err) => {
                    console.log(`Error posting price to database: ${err}`);
                    res.sendStatus(500)
                })

        })
        .catch((err) => {
            console.log(`Error posting product to database: ${err}`);
            res.sendStatus(500)
        });
});


/**
 * PUT price to current_product_prices table
 */

router.put('/editPrice/:id', (req: Request, res: Response, next: express.NextFunction): void => {
    const current_price_per_unit: number = req.body.current_price_per_unit
    const status: string = req.body.status;
    const rowId: string = req.params.id;
    const queryText: string = `UPDATE "current_product_prices" 
                                SET "current_price_per_unit" = $1,
                                "status" = $2
                                WHERE "id" = $3;`;

    pool.query(queryText, [current_price_per_unit, status, rowId])
        .then(() => { res.sendStatus(201) })
        .catch((err) => {
            console.log(`Error updating store: ${err}`);
            res.sendStatus(500)
        }
        );
});



export default router;