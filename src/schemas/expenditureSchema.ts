import JoiBase from 'joi';
import JoiDate from '@joi/date';

const Joi = JoiBase.extend(JoiDate);

const joiSchema = Joi.object({
  expenditure: Joi.number().min(1).required(),
  date: Joi.date().format('YYYY-MM-DD').required(),
  category: Joi.string().empty().required(),
});

export default joiSchema;
