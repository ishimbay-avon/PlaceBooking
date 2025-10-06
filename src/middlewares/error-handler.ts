import { NextFunction, Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import BaseError from "../errors/base-error";
import InternalError from "../errors/internal-error";
import BadRequestError from "../errors/bad-request-error";
import ConflictError from "../errors/conflict-error";

interface PgError extends Error {
  code?: string;
  detail?: string;
}

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error: Error | BaseError = err;

  if (error instanceof QueryFailedError) {    
    const queryError = error as PgError;

    if (queryError.code === "23505") {
      error = new ConflictError(
        "Запись с таким уникальным полем уже существует"
      );
    } else {
      error = new BadRequestError("Ошибка запроса к базе данных");
    }
  }

  // Если ошибка не имеет статус-кода, считаем её внутренней ошибкой сервера
  if (!(error instanceof BaseError)) {
    error = new InternalError("На сервере произошла ошибка");
  }
  // Возвращаем ответ клиенту
  return res.status((error as BaseError).statusCode).json({
    message: error.message || "Ошибка сервера",
  });
};

export default errorHandler;
