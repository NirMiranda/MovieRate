import Joi from '@hapi/joi';

const authSchema = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z\s]+$/),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    age: Joi.number().min(6).max(120),
});

export default authSchema;
