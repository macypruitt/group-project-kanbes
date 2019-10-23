import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET route to get all current products from database
 */
router.get('/', (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText: string = `SELECT * FROM "products"
                            JOIN "current_product_prices" ON "current_product_prices"."product_id" = "products"."id" 
                            WHERE "current_product_prices"."status" = TRUE
                            ORDER BY "products"."product_name" ASC;`;
    pool.query(queryText)
        .then((result) => res.send(result.rows))
        .catch((err) => {
            console.log(`Error in GET all active products: ${err}`);
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



export default router;