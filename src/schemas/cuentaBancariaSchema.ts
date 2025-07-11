import Joi from "joi";

export const cuentaBancariaCrearSchema = Joi.object({
    nombre: Joi.string().min(3).max(100).required().messages({
        'any.required': 'El nombre de la cuenta es obligatorio.',
        'string.base': 'El nombre de la cuenta debe ser un texto.',
        'string.min': 'El nombre de la cuenta debe tener al menos 3 caracteres.',
        'string.max': 'El nombre de la cuenta no debe superar los 100 caracteres.'
    }),
    saldo: Joi.number().precision(2).min(0).required().messages({
        'any.required': 'El saldo es obligatorio.',
        'number.base': 'El saldo debe ser un número.',
        'number.max': 'El saldo no puede superar los 10 dígitos enteros (máx: 9999999999.99).',
        'number.precision': 'El saldo solo puede tener hasta 2 decimales.'
    })
});
