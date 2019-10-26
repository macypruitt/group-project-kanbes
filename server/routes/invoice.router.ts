import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET data to populate invoice
 */
router.get('/invoiceData/:id', (req: Request, res: Response, next: express.NextFunction): void => {


    // const startDateTime:string = '';
    // const endDateTime:string = '';
    console.log('req.params',req.params)
    const storeId: string = req.params.id;

    const queryText: string = `SELECT OS.store_id, OS.last_modified, OS.product_id, OS.current_price_per_unit_id, OS.sold_product_count, 
                            current_price_per_unit, OS.sold_price_per_unit,product_name, SUM(OS.sold_product_count) AS "Total Sold", 
                            SUM(OS."sold_product_count" * "sold_price_per_unit") AS "Total Sales" FROM "outgoing_store" OS
                            JOIN "user" ON "user"."id" = OS."user_id"
                            JOIN "products" ON "products"."id" = OS."product_id"
                            JOIN "stores" ON "stores"."id" = OS."store_id"
                            JOIN "suppliers" ON "suppliers"."id" = OS."supplier_id"
                            JOIN "current_product_prices" ON "current_product_prices"."id" = OS."current_price_per_unit_id"
                           
                            AND OS."product_id" = OS."current_price_per_unit_id"
                            AND OS.store_id = $1
                            GROUP BY OS.store_id,OS.last_modified, OS.product_id, OS.current_price_per_unit_id, current_price_per_unit,
                            OS.sold_product_count, OS.sold_price_per_unit, product_name;`;

                            // WHERE "last_modified" BETWEEN $1 AND $2 

    pool.query(queryText, [storeId])
        .then((result) => {
         
            res.send(result.rows)
        })
        .catch((err) => {
            console.log(`Error in GET for invoice: ${err}`);
            res.sendStatus(500)
        }
        );

});

/**
 * GET historical invoice parameters
 */
router.get('/invoiceParameters', (req: Request, res: Response, next: express.NextFunction): void => {

  const queryText: string = `SELECT * from "invoices" ORDER BY "invoice_date" DESC;`;

  pool.query(queryText)
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
router.post('/addInvoice', (req: Request, res: Response, next: express.NextFunction): void => {
  const invoice_date: string = req.body.invoiceDate;
  const start_date: string = req.body.startDate;
  const end_date: string | null = req.body.endDate;
  const store_id: string | null = req.body.store_id;
  const invoice_number: string | null = req.body.invoiceNum;

  const queryText: string = `INSERT INTO "invoices" ("invoice_date","start_date", "end_date", "store_id", "invoice_number")
                              VALUES ($1, $2, $3, $4, $5);`;

  pool.query(queryText, [invoice_date, start_date, end_date, store_id, invoice_number])
      .then(() => res.sendStatus(201))
      .catch((err) => {
          console.log(`Error posting invoice to database: ${err}`);
          res.sendStatus(500)
      }
      );
});


export default router;