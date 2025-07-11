import Joi from "joi";

export const usuarioCrearSchema = Joi.object({
    username: Joi.string().min(3).max(100).required()
        .messages({
            'any.required': 'El nombre de usuario es obligatorio.',
            'string.base': 'El nombre de usuario debe ser un texto.',
            'string.min': 'El nombre de usuario debe tener al menos 3 caracteres.',
            'string.max': 'El nombre de usuario no debe superar los 100 caracteres.'
    }),
    email: Joi.string().email().max(100).required()
        .messages({
            'any.required': 'El email es obligatorio.',
            'string.email': 'Debe proporcionar un email válido.',
            'string.base': 'El email debe ser un texto.',
            'string.max': 'El email no debe superar los 100 caracteres.'
    }),
    contrasenia: Joi.string().min(6).max(100).required()
        .messages({
            'any.required': 'La contraseña es obligatoria.',
            'string.base': 'La contraseña debe ser un texto.',
            'string.min': 'La contraseña debe tener al menos 6 caracteres.',
            'string.max': 'La contraseña no debe superar los 100 caracteres.'
    })
});
