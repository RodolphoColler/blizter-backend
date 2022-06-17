import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

export const create = Joi.object({
  value: Joi.number().min(1).required(),
  date: Joi.date().format('YYYY-MM-DD').required(),
});

export const readOne = Joi.object({
  date: Joi.date().format('YYYY-MM-DD').required(),
});
