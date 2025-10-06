import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { reserve } from '../controllers/bookings.controller';
import { validateBooking } from '../middlewares/validatons';

const bookingshRouter = Router();

bookingshRouter.post('/reserve', celebrate({ [Segments.BODY]: validateBooking.body }), reserve);

export default bookingshRouter;
