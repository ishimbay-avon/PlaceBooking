import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../config/db.config';
import { Booking } from '../entities/bookings.entity';
import { Event } from '../entities/events.entity';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import ConflictError from '../errors/conflict-error';

export const reserve = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { event_id, user_id } = req.body;

    if (!event_id || !user_id) {
      // return res.status(400).json({ message: 'event_id and user_id are required' });
      return next(new BadRequestError('Требуется event_id и user_id'));
    }

    const eventRepository = AppDataSource.getRepository(Event);
    const bookingRepository = AppDataSource.getRepository(Booking);

    const event = await eventRepository.findOneBy({ id: event_id });
    if (!event) {
      // return res.status(404).json({ message: 'Event not found' });
      return next(new NotFoundError('Мероприятие не найдено'));
    }

    // Проверяем, есть ли уже бронирование с таким event_id и user_id
    const existingBooking = await bookingRepository.findOne({
      where: { event: { id: event_id }, user_id },
      relations: ['event']
    });

    if (existingBooking) {
      // return res.status(409).json({ message: 'User already booked this event' });
      return next(new ConflictError('Пользователь уже забронировал это мероприятие'));
    }

    const booking = new Booking();
    booking.event = event;
    booking.user_id = user_id;

    await bookingRepository.save(booking);

    return res.status(201).json({ message: 'Мероприятие успешно забронировано', booking });
  } catch (error) {
    return next(error);
  }
};