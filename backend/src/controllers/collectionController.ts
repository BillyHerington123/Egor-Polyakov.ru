import { Request, Response } from 'express';
import db from '../db';

export const getAllCollections = async (req: Request, res: Response) => {
    try {
        const { rows } = await db.query('SELECT id, slug, title, description, pinned, cover_image_url AS "coverImageUrl" FROM collection ORDER BY pinned DESC, created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching collections:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
