import Joi from 'joi';

export const metodoPagoCrearSchema = Joi.object({
    nombre: Joi.string().trim().min(1).max(100).required().messages({
        'any.required': 'El nombre del método de pago es obligatorio.',
        'string.base': 'El nombre del método de pago debe ser un texto.',
        'string.min': 'El nombre del método de pago debe tener al menos 1 carácter.',
        'string.max': 'El nombre del metodo de pago no debe superar los 100 caracteres.'
    })
});
