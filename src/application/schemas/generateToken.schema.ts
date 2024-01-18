import * as Joi from 'joi';
import { isLuhnValid } from '../useCases/validateNumberCardCase';
import { isDomainValid } from '../useCases/validateEmailDomainCase';
import { validateYearExpireCase } from '../useCases/validateYearExpireCase';

export const generateTokenSchema = Joi.object({
    cardNumber: Joi.number()
        .integer()
        .min(1e12)
        .max(1e16 - 1)
        .custom((value, helpers) => {
            if (!isLuhnValid(value)) {
                return helpers.error('Ingrese un número de tarjeta válido');
            }
            return value;
        }).message('Ingrese un número de tarjeta válido')
        .required(),
    cvc:Joi.number()
        .integer()
        .min(100)
        .max(9999),
    expiration_month: Joi.string()
        .min(1)
        .max(2)
        .regex(/^(0?[1-9]|1[0-2])$/)
        .required(),
    expiration_year: Joi.string()
        .length(4)
        .regex(/^\d{4}$/).message('Solo se permiten números')
        .required()
        .custom((value, helpers) => {
            if (!validateYearExpireCase(value)) {
                return helpers.error('Año de expiración inválido');
            }
            return value;
        }),
    email: Joi.string()
        .email()
        .min(5)
        .max(100)
        .required()
        .custom((value, helpers) => {
            if (!isDomainValid(value)) {
                return helpers.error('El dominio proporcionado no corresponde con los dominios permitidos');
            }
            return value;
        }),
});