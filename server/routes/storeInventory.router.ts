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
                            WHERE "stores"."id" = $1;`
                            // AND "last_modified"=(SELECT MAX("last_modified") FROM "outgoing_store");`;

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
 * POST route to add product inventory change to outgoing_store inventory from database
 */
// router.post('/', (req: Request, res: Response, next: express.NextFunction): void => {
//     const newPassword: string = generatePassword(8, false);
  
//     // store password in database
//     const username: string = req.body.username;
//     const password: string = encryptPassword(newPassword);
//     const firstName: string = req.body.first_name;
//     const lastName: string = req.body.last_name;
//     const email: string | null = req.body.email;
//     const role: string = req.body.role;
//     const adminLevel: string = req.body.admin_level;
  
//     const queryText: string = `INSERT INTO "user" (first_name, last_name, username, email, password, role, admin_level) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
//     pool.query(queryText, [firstName, lastName, username, email, password, role, adminLevel])
//       .then(() => {
//         // then email it!
//         mail(newPassword, email);
  
//         // Whatever, just respond. Or move this into a function away from an endpoint and then no response needed.
//         res.send(newPassword);
//       }
//       )
//       .catch((err) => {
//         console.log(`Error saving user to database: ${err}`);
//         res.sendStatus(500)
//       }
//       );
  
//   });

export default router;