import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../config/db.config';
import { Event } from '../entities/events.entity';
import BadRequestError from '../errors/bad-request-error';

export const addEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, total_seats } = req.body;

    if (!name || typeof total_seats !== 'number') {      
      return next(new BadRequestError('Требуется name и total_seats'));
    }

    const eventRepository = AppDataSource.getRepository(Event);
    
    const event = new Event();
    event.name = name;
    event.total_seats = total_seats;

    await eventRepository.save(event);

    return res.status(201).json({ message: 'Мероприятие успешно создано', event });
  } catch (error) {
    return next(error);
  }
};

