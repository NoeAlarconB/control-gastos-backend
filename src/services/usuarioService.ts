import { usuarios, PrismaClient } from "@prisma/client";
import { Usuario } from '../models/usuario';
import { RESPONSE_DELETE_OK, RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK } from "../shared/constans";
import { fromPrismaUsuario, toPrismaUsuario } from "../mappers/usuario.mapper";


const prisma = new PrismaClient();

export const listarUsuarios = async() => {
    const usuario: usuarios[] = await prisma.usuarios.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_usuario: 'asc'
        }
    });
    return usuario.map((usuario: usuarios) => fromPrismaUsuario(usuario));
}

export const obtenerUsuario = async(id: number) => {
    const usuario: usuarios | null = await prisma.usuarios.findUnique({
        where: {
            id_usuario: id
        }
    });
    return usuario ? fromPrismaUsuario(usuario) : null;
}

export const insertUsuario = async(usuario: Usuario) => {
    await prisma.usuarios.create({
        data: toPrismaUsuario(usuario)
    });
    return RESPONSE_INSERT_OK;
}

export const actualizarUsuario = async(id: number, usuario: Usuario) => {
    const dataAtualizada: Usuario = {...usuario, fechaActualizacion: new Date()}
    await prisma.usuarios.update({
        where: {
            id_usuario: id
        },
        data: toPrismaUsuario(dataAtualizada)
    });
    return RESPONSE_UPDATE_OK;
}

export const eliminarUsuario = async(id: number) => {
    await prisma.usuarios.update({
        where: {
            id_usuario: id
        },
        data: {
            estado_auditoria: '0',
            fecha_actualizacion: new Date()
        }
    });

    return RESPONSE_DELETE_OK;
}
