import { signToken } from "./jwt";
import { RESPONSE_CREDENTIALS_ERROR } from "../shared/constans";
import { PrismaClient } from '@prisma/client';
import { comparePassword, hashPassword  } from '../shared/bcrypt';

const prisma = new PrismaClient();

export const loginAuth = async (username: string, password: string) => {
    console.log('auth.service::loginAuth');

    const usuario = await prisma.usuarios.findFirst({
        where: {
            username
        }
    });

    if (!usuario) return RESPONSE_CREDENTIALS_ERROR;

    const validPassword = await comparePassword(password, usuario.contrasenia);
    if (!validPassword) return RESPONSE_CREDENTIALS_ERROR;

    const token = signToken({ id: usuario.id_usuario, username: usuario.username, email: usuario.email });
    return token;
};


export const registerUser = async (username: string, email: string, password: string) => {
    const existing = await prisma.usuarios.findFirst({
        where: { email }
    });

    if (existing) {
        throw new Error("El email ya existe");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.usuarios.create({
        data: {
            username,
            email,
            contrasenia: hashedPassword
        }
    });

    return {
        id: newUser.id_usuario,
        username: newUser.username,
        email: newUser.email
    };
};