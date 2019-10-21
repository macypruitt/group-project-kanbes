import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET route to get all stores from database
 */
router.get('/', (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText: string = `SELECT * FROM "stores" ORDER BY "delivery_route_order" ASC;`;
    pool.query(queryText)
        .then((result) => res.send(result.rows))
        .catch((err) => {
            console.log(`Error in GET all stores: ${err}`);
            res.sendStatus(500)
        }
        );
});

/**
 * GET route to get all active stores from database
 */
router.get('/active', (req: Request, res: Response, next: express.NextFunction): void => {
    const queryText: string = `SELECT * FROM "stores" WHERE "status" = 'TRUE' ORDER BY "delivery_route_order" ASC;`;
    pool.query(queryText)
        .then((result) => res.send(result.rows))
        .catch((err) => {
            console.log(`Error in GET all stores: ${err}`);
            res.sendStatus(500)
        }
        );
});

/**
 * POST route to post store to database
 */
router.post('/', (req: Request, res: Response, next: express.NextFunction): void => {
    const store_name: string = req.body.store_name;
    const address: string = req.body.address;
    const contactName: string | null = req.body.contact_name;
    const contactEmail: string | null = req.body.contact_email;
    const contactPhone: string | null = req.body.contact_phone;
    const status: boolean = req.body.status;
    const storePhoneNumber: string | null = req.body.store_phone_number;
    const deliveryRouteOrder: number = req.body.delivery_route_order;

    const queryText: string = `INSERT INTO "stores" ("store_name", "address", "contact_name", 
                                "contact_email", "contact_phone", "status", "store_phone_number", "delivery_route_order")
                                VALUES($1, $2, $3, $4, $5, $6, $7, $8);`;

    pool.query(queryText, [store_name, address, contactName, contactEmail, contactPhone, status, storePhoneNumber, deliveryRouteOrder])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log(`Error posting store to database: ${err}`);
            res.sendStatus(500)
        }
        );
});

/**
 * PUT route to edit store data
 */

router.put('/update/DeliveryRoutes', (req: Request, res: Response, next: express.NextFunction): void => {

    const deliveryRoutesArray = req.body
    console.log('req.body', req.body)

    let queryText: string = `UPDATE "stores"
                    SET "delivery_route_order" = CASE "id" `

    for (let i = 0; i < deliveryRoutesArray.length; i++) {
        let queryStringToAdd = ' WHEN ' + deliveryRoutesArray[i].id + ' THEN ' + deliveryRoutesArray[i].delivery_route_order
        queryText += queryStringToAdd
    }


    queryText += ` ELSE "delivery_route_order" END`

console.log(queryText)

    pool.query(queryText)
        .then(() => { res.sendStatus(201) })
        .catch((err) => {
            console.log(`Error updating store: ${err}`);
            res.sendStatus(500)
        }
        );
});

router.put('/:id', (req: Request, res: Response, next: express.NextFunction): void => {
    const store_name: string = req.body.store_name;
    const address: string = req.body.address;
    const contactName: string | null = req.body.contact_name;
    const contactEmail: string | null = req.body.contact_email;
    const contactPhone: string | null = req.body.contact_phone;
    const status: boolean = req.body.status;
    const storePhoneNumber: string | null = req.body.store_phone_number;
    const deliveryRouteOrder: number = req.body.delivery_route_order;

    const storeId: string = req.params.id;
    const queryText: string = `UPDATE "stores" SET "store_name" = $1, "address" = $2, "contact_name" = $3, 
                    "contact_email" = $4, "contact_phone" = $5, "status" = $6, "store_phone_number" = $7, "delivery_route_order" = $8
                    WHERE "id" = $9;`;

    pool.query(queryText, [store_name, address, contactName, contactEmail, contactPhone, status, storePhoneNumber, deliveryRouteOrder, storeId])
        .then(() => { res.sendStatus(201) })
        .catch((err) => {
            console.log(`Error updating store: ${err}`);
            res.sendStatus(500)
        }
        );
});



export default router;