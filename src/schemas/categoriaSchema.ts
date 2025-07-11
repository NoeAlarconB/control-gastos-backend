import Joi from "joi";

export const categoriaCrearSchema = Joi.object({
    nombre: Joi.string().trim().min(3).max(100).required()
        .messages({
            'any.required': 'El nombre de la categoría es obligatorio.',
            'string.base': 'El nombre debe ser un texto.',
            'string.min': 'El nombre debe tener al menos 3 caracteres.',
            'string.max': 'El nombre no debe exceder los 100 caracteres.'
    }),
    tipo: Joi.string().valid('ingreso', 'gasto').required()
        .messages({
            'any.required': 'El tipo de la categoría es obligatorio.',
            'any.only': 'El tipo debe ser "ingreso" o "gasto".',
            'string.base': 'El tipo debe ser un texto.'
    })
});
