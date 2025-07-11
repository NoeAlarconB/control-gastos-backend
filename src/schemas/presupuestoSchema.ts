import Joi from "joi";

export const presupuestoCrearSchema = Joi.object({
    idCategoria: Joi.number().integer().required().messages({
        'any.required': 'El id categoría es obligatorio.',
        'number.base': 'El id categoría debe ser un número entero.',
        'number.integer': 'El id categoría debe ser un número entero.'
    }),
    montoMaximo: Joi.number().positive().precision(2).required().messages({
        'any.required': 'El monto máximo es obligatorio.',
        'number.base': 'El monto máximo debe ser un número.',
        'number.positive': 'El monto máximo debe ser un número positivo.',
        'number.precision': 'El monto máximo debe tener como máximo dos decimales.'
    }),
    mes: Joi.number().integer().min(1).max(12).required().messages({
        'any.required': 'El mes es obligatorio.',
        'number.base': 'El mes debe ser un número entero.',
        'number.min': 'El mes debe estar entre 1 y 12.',
        'number.max': 'El mes debe estar entre 1 y 12.'
    }),
    anio: Joi.number().integer().min(2000).max(2100).required().messages({
        'any.required': 'El año es obligatorio.',
        'number.base': 'El año debe ser un número entero.',
        'number.min': 'El año debe ser mayor o igual a 2000.',
        'number.max': 'El año debe ser menor o igual a 2100.'
    })
});
