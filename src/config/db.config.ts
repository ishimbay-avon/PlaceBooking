import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Booking } from '../entities/bookings.entity';
import { Event } from '../entities/events.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Booking, Event],
  synchronize: true,  // только для разработки, в продакшене – миграции
});