import Joi from 'joi';

const joiSchema = Joi.object({
  email: Joi.string().empty().required().regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .messages({ 'string.pattern.base': '"email" must be a valid email' }),
  password: Joi.string().empty().min(7).required(),
  name: Joi.string().empty().required(),
});

export default joiSchema;
