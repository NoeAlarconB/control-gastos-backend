import Joi from 'joi';

export const loginSchema = Joi.object({
    username: Joi.string().required().messages({
        'string.empty': 'El nombre de usuario es obligatorio'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'La contraseña es obligatoria'
    })
});

export const registerSchema = Joi.object({
    username: Joi.string().required().messages({
        'string.empty': 'El nombre de usuario es obligatorio'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'El correo es obligatorio',
        'string.email': 'El correo no es válido'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'La contraseña es obligatoria',
        'string.min': 'La contraseña debe tener al menos 6 caracteres'
    })
});
