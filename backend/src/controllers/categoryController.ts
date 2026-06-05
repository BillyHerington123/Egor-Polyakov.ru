import { Request, Response } from 'express';
import db from '../db';

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const { rows } = await db.query('SELECT id, slug, title FROM category ORDER BY title->>\'ru\' ASC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
