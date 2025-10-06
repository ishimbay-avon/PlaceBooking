import { Joi } from 'celebrate';

export const validateBooking = {
  body: Joi.object({
    event_id: Joi.number().integer().required().messages({
      'number.base': 'event_id должен быть числом',
      'number.integer': 'event_id должен быть целым числом',
      'any.required': 'event_id обязательно для заполнения',
    }),
    user_id: Joi.string().required().messages({
      'string.base': 'user_id должен быть строкой',
      'string.empty': 'user_id не может быть пустым',
      'any.required': 'user_id обязательно для заполнения',
    }),
  })
}

export const validateEvent = {
  body: Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'name должен быть строкой',
      'string.empty': 'name не может быть пустым',
      'any.required': 'name обязательно',
    }),
    total_seats: Joi.number().integer().min(1).required().messages({
      'number.base': 'total_seats должен быть числом',
      'number.integer': 'total_seats должен быть целым числом',
      'number.min': 'total_seats должен быть минимум 1',
      'any.required': 'total_seats обязательно',
    }),
  })
};