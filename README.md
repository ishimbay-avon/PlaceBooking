# Добро пожаловать в тестовый проект PlaceBooking!

PlaceBooking -  API для бронирования места на мероприятие.

## 🛠️ Технологии

| Категория      | Технологии                           |
|----------------|--------------------------------------|
| Бэкенд         | Node.js, Express, TypeScript         |
| Базы данных    | PostgreSQL, TypeORM                  |
| Инструменты    | Postman, pgAdmin 4                   |


## ⚙️ API роуты

- POST /api/bookings/reserve - бронирование мероприятия
- POST /api/events/add - добавление мероприятия

## 📦 Структура проекта
- src/ — исходный код:  
  - controllers/ — контроллеры
  - errors/ — централизованная обработка ошибок
  - middlewares/ — мидлвары errorHandler, logger, validations
  - entities/ — сущности
  - routes/ — роуты
  - app.ts — запуск сервера, подключение TypeORM, настройка роутов
  - config/db.config.ts — настройка объекта подключения к базе данных PostgreSQL с помощью TypeORM
- .eslintrc — конфигурация ESLint (Airbnb, исключение _id)
- package.json — скрипты start, dev, build, lint, зависимости
- tsconfig.json — настройки TypeScript
- .env.example - пример файла переменных окружения

## 📥 Установка и запуск

1. Установите зависимости:
```
npm install
```

2. Установите PostgreSQL с официального сайта https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

Во время установки задайте пароль postgres для пользователя postgres (по-умолчанию)

Выполните в терминале команду подключения в psql:
```
psql -U postgres
```

Затем создайте базу:
```
CREATE DATABASE placebooking;
```

Выйдите из psql:
```
\q
```

Запустите pgAdmin и подключитесь к БД placebooking

3. Скомпилируйте проект:
```
npm run build
```

4. Проверьте код на ошибки линтера:
```
npm run lint
```

5. Запустите проект:
```
npm run start
```

Приложение будет доступно по адресу: http://localhost:3000

6. Через pgAdmin проверьте наличие созданных таблиц event и booking

Наполните таблицы данными, например:
```
INSERT INTO public.events (name, total_seats) VALUES
('Концерт рок-музыки', 100),
('Театральная премьера', 50),
('Киноночь', 200);
```

```
INSERT INTO bookings ("eventId", user_id, created_at) VALUES
(1, 'user123', '2025-10-06 10:00:00'),
(1, 'user456', '2025-10-06 10:05:00'),
(2, 'user789', '2025-10-05 19:00:00'),
(3, 'user123', '2025-10-06 11:00:00');
```

## ☕ Проверка маршрутов

1. POST /api/bookings/reserve

Бронирование места на мероприятие. Ответ — информация о бронировании.

Передайте в Body (raw). Пример тела запроса:
```
{
  "event_id": 1,
  "user_id": "user123"
}
```

2. POST /api/events/add

Добавление мероприятия. Ответ — информация о добавлении мероприятия.

Передайте в Body (raw). Пример тела запроса:
```
{
  "name": "Дискотека",
  "total_seats": 500
}
```
