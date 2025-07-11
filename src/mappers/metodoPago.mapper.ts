import { metodos_pago } from "@prisma/client";
import { MetodoPago } from "../models/metodosPagos";

export const fromPrismaMetodoPago = (metodoPago: metodos_pago) => {
    return {
        idMetodoPago: metodoPago.id_metodo_pago,
        idUsuario: metodoPago.id_usuario,
        nombre: metodoPago.nombre,
        estadoAuditoria: metodoPago.estado_auditoria,
        fechaCreacion: metodoPago.fecha_creacion ? new Date(metodoPago.fecha_creacion) : null,
        fechaActualizacion: metodoPago.fecha_actualizacion ? new Date(metodoPago.fecha_actualizacion) : null
    };
}

export const toPrismaMetodoPago = (metodoPago: MetodoPago) => {
    return {
        id_metodo_pago: metodoPago.idMetodoPago,
        id_usuario: metodoPago.idUsuario,
        nombre: metodoPago.nombre,
        estado_auditoria: metodoPago.estadoAuditoria,
        fecha_actualizacion: metodoPago.fechaActualizacion ? metodoPago.fechaActualizacion.toISOString() : null
    };
}