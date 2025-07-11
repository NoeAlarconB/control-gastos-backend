import { usuarios } from "@prisma/client";
import { Usuario } from '../models/usuario';

export const fromPrismaUsuario = (usuario: usuarios) => {
    return {
        idUsuario: usuario.id_usuario,
        username: usuario.username,
        email: usuario.email,
        contrasenia: usuario.contrasenia,
        estadoAuditoria: usuario.estado_auditoria,
        fechaCreacion: usuario.fecha_creacion ? new Date(usuario.fecha_creacion) : null,
        fechaActualizacion: usuario.fecha_actualizacion ? new Date(usuario.fecha_actualizacion) : null
    };
}

export const toPrismaUsuario = (usuario: Usuario) => {
    return {
        id_usuario: usuario.idUsuario,
        username: usuario.username,
        email: usuario.email,
        contrasenia: usuario.contrasenia,
        estado_auditoria: usuario.estadoAuditoria,
        fecha_actualizacion: usuario.fechaActualizacion ? usuario.fechaActualizacion.toISOString() : null
    };
}