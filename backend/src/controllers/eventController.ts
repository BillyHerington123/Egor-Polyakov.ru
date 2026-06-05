import { Request, Response } from 'express';
import db from '../db';

const eventBaseQuery = `
    SELECT
        e.id,
        e.status,
        e.format,
        e.slug,
        e.title,
        e.subtitle,
        e.description,
        e.age,
        e.start_at AS "startAt",
        e.end_at AS "endAt",
        e.timezone,
        e.language_main AS "languageMain",
        e.price_mode AS "priceMode",
        e.price_min AS "priceMin",
        e.price_max AS "priceMax",
        e.currency,
        e.is_free AS "isFree",
        e.ticket_url AS "ticketUrl",
        e.registration_url AS "registrationUrl",
        e.created_at AS "createdAt",
        e.updated_at AS "updatedAt",
        json_build_object('id', c.id, 'name', c.name) AS city,
        json_build_object('id', v.id, 'name', v.name, 'address', v.address) AS venue,
        json_build_object('id', o.id, 'name', o.name, 'description', o.description) AS organizer,
        json_build_object('id', m.id, 'url', m.url) AS "heroMedia",
        (SELECT json_agg(json_build_object('id', cat.id, 'slug', cat.slug, 'title', cat.title))
         FROM event_category ec
         JOIN category cat ON ec.category_id = cat.id
         WHERE ec.event_id = e.id) AS categories,
        (SELECT json_agg(json_build_object('id', t.id, 'slug', t.slug, 'title', t.title))
         FROM event_tag et
         JOIN tag t ON et.tag_id = t.id
         WHERE et.event_id = e.id) AS tags
    FROM event e
    LEFT JOIN city c ON e.city_id = c.id
    LEFT JOIN venue v ON e.venue_id = v.id
    LEFT JOIN organizer o ON e.organizer_id = o.id
    LEFT JOIN media_asset m ON e.hero_media_id = m.id
`;

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const query = `${eventBaseQuery} WHERE e.status = 'published' ORDER BY e.start_at ASC`;
        const { rows } = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const query = `${eventBaseQuery} WHERE e.id = $1`;
        const { rows } = await db.query(query, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(`Error fetching event ${req.params.id}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getEventsByOrganizer = async (req: Request, res: Response) => {
    try {
        const { organizerId } = req.params;
        // Using a simpler query for the dashboard list for performance
        const query = `
            SELECT
                e.id,
                e.title,
                e.status,
                e.start_at AS "startAt",
                (SELECT json_agg(json_build_object('title', cat.title)) 
                 FROM event_category ec
                 JOIN category cat ON ec.category_id = cat.id
                 WHERE ec.event_id = e.id AND e.category_primary = cat.id
                ) AS categories
            FROM event e
            WHERE e.organizer_id = $1
            ORDER BY e.start_at DESC
        `;
        const { rows } = await db.query(query, [organizerId]);
        res.json(rows);
    } catch (error) {
        console.error(`Error fetching events for organizer ${req.params.organizerId}:`, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
