import { categorias } from "@prisma/client"
import { Categoria } from "../models/categoria";

export const fromPrismaCategoria = (categoria: categorias) => {
    return {
        idCategoria: categoria.id_categoria,
        idUsuario: categoria.id_usuario,
        nombre: categoria.nombre,
        tipo: categoria.tipo,
        estadoAuditoria: categoria.estado_auditoria,
        fechaCreacion: categoria.fecha_creacion ? new Date(categoria.fecha_creacion) : null,
        fechaActualizacion: categoria.fecha_actualizacion ? new Date(categoria.fecha_actualizacion) : null
    };
}

export const toPrismaCategoria = (categoria: Categoria) => {
    return {
        id_categoria: categoria.idCategoria,
        id_usuario: categoria.idUsuario,
        nombre: categoria.nombre,
        tipo: categoria.tipo,
        estado_auditoria: categoria.estadoAuditoria,
        fecha_actualizacion: categoria.fechaActualizacion ? categoria.fechaActualizacion.toISOString() : null
    }
}