import { Request, Response } from "express";
import express from 'express';
import pool from '../modules/pool';

const router: express.Router = express.Router();

/**
 * GET route template
 */
router.get('/', (req: Request, res: Response, next: express.NextFunction): void => {

});

/**
 * POST route template
 */
router.post('/', (req: Request, res: Response, next: express.NextFunction): void => {
    res.sendStatus(201);
});

module.exports = router;