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
// router.post('/', (req: Request, res: Response, next: express.NextFunction): void => {
//     const store_name: string = req.body.store_name;
//     const address: string = req.body.address;
//     const contactName: string | null = req.body.contact_name;
//     const contactEmail: string | null = req.body.contact_email;
//     const contactPhone: string | null = req.body.contact_phone;
//     const status: boolean = req.body.status;
//     const storePhoneNumber: string | null = req.body.store_phone_number;
//     const deliveryRouteOrder: number = req.body.delivery_route_order;

//     const queryText: string = `INSERT INTO "stores" ("store_name", "address", "contact_name", 
//                                 "contact_email", "contact_phone", "status", "store_phone_number", "delivery_route_order")
//                                 VALUES($1, $2, $3, $4, $5, $6, $7, $8);`;

//     pool.query(queryText, [store_name, address, contactName, contactEmail, contactPhone, status, storePhoneNumber, deliveryRouteOrder])
//         .then(() => res.sendStatus(201))
//         .catch((err) => {
//             console.log(`Error posting store to database: ${err}`);
//             res.sendStatus(500)
//         }
//         );
// });

/**
 * PUT price to price table
 */

router.put('/editPrice/:id', (req: Request, res: Response, next: express.NextFunction): void => {
    const current_price_per_unit: number = req.body.current_price_per_unit

    const rowId: string = req.params.id;
    const queryText: string = `UPDATE "current_product_prices" SET "current_price_per_unit" = $1
                                WHERE "id" = $2;`;

    pool.query(queryText, [current_price_per_unit, rowId])
        .then(() => { res.sendStatus(201) })
        .catch((err) => {
            console.log(`Error updating store: ${err}`);
            res.sendStatus(500)
        }
        );
});



export default router;