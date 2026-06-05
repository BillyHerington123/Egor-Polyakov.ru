import { Router } from 'express';
import { getAllEvents, getEventById, getEventsByOrganizer } from '../controllers/eventController';
import { getAllCollections } from '../controllers/collectionController';
import { getAllCategories } from '../controllers/categoryController';

const router = Router();

// Event Routes
router.get('/events', getAllEvents);
router.get('/events/:id', getEventById);

// Collection Routes
router.get('/collections', getAllCollections);

// Category Routes
router.get('/categories', getAllCategories);

// Organizer Routes
router.get('/organizers/:organizerId/events', getEventsByOrganizer);


export default router;
