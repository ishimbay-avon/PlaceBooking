import express from 'express';
import { errors } from 'celebrate';
import { AppDataSource } from "./config/db.config";
import bookingRouter from './routes/bookings';
import { errorLogger, requestLogger } from './middlewares/logger';
import errorHandler from './middlewares/error-handler';
import eventsRouter from './routes/events';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

AppDataSource.initialize()
  .then(() => {
    console.log('Успешное подключение к базе данных TypeORM!');

    app.use(requestLogger);

    app.use('/api/bookings', bookingRouter);
    app.use('/api/events', eventsRouter);

    app.use(errorLogger);
    app.use(errors());
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Ошибка подключения к базе данных TypeORM:', error);
  });
