import Joi from "joi";

export const transaccionCrearSchema = Joi.object({
    idCategoria: Joi.number().integer().required().messages({
        'any.required': 'El id categoría es obligatoria.',
        'number.base': 'El id categoría debe ser un número entero.',
        'number.integer': 'El id categoría debe ser un número entero.'
    }),
    idMetodoPago: Joi.number().integer().required().messages({
        'any.required': 'El id método de pago es obligatorio.',
        'number.base': 'El id método de pago debe ser un número entero.',
        'number.integer': 'El id método de pago debe ser un número entero.'
    }),
    idCuenta: Joi.number().integer().required().messages({
        'any.required': 'El id cuenta es obligatoria.',
        'number.base': 'El id cuenta debe ser un número entero.',
        'number.integer': 'El id cuenta debe ser un número entero.'
    }),
    monto: Joi.number().positive().precision(2).required().messages({
        'any.required': 'El monto es obligatorio.',
        'number.base': 'El monto debe ser un número.',
        'number.positive': 'El monto debe ser mayor que cero.',
        'number.precision': 'El monto debe tener como máximo dos decimales.'
    }),
    tipo: Joi.string().valid('ingreso', 'gasto').required().messages({
        'any.required': 'El tipo de la transaccion es obligatorio.',
        'any.only': 'El tipo debe ser "ingreso" o "gasto".',
        'string.base': 'El tipo debe ser un texto.'
    })
});
