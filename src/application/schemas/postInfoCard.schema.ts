import * as Joi from 'joi';

export const postInfoCardSchema = Joi.object({
    token_card: Joi.string()
        .length(16)
        .required(),
});