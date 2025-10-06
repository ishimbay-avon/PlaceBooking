import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { addEvent } from '../controllers/events.controller';
import { validateEvent } from '../middlewares/validatons';

const eventsRouter = Router();

eventsRouter.post('/add', celebrate({ [Segments.BODY]: validateEvent.body }), addEvent);

export default eventsRouter;
