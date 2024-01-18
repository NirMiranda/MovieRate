import Joi from '@hapi/joi';

const authSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).max(14).required(),
    age: Joi.number().min(6).max(120).required(),
});

export default authSchema;