import { transacciones } from "@prisma/client";
import { Transaccion } from "../models/transaccion";

export const fromPrismaTransaccion = (transaccion: transacciones & 
    { categoria?: { nombre: string }, metodo_pago?: { nombre: string }, cuenta?: { nombre: string }}) => {
    return {
        idTransacciones: transaccion.id_transacciones,
        idUsuario: transaccion.id_usuario,
        idCategoria: transaccion.id_categoria,
        nombreCategoria: transaccion.categoria?.nombre || '',
        idMetodoPago: transaccion.id_metodo_pago,
        nombreMetodo: transaccion.metodo_pago?.nombre || '',
        idCuenta: transaccion.id_cuenta,
        nombreCuenta: transaccion.cuenta?.nombre || '',
        monto: transaccion.monto,
        tipo: transaccion.tipo,
        descripcion: transaccion.descripcion,
        estadoAuditoria: transaccion.estado_auditoria,
        fechaCreacion: transaccion.fecha_creacion ? new Date(transaccion.fecha_creacion) : null,
        fechaActualizacion: transaccion.fecha_actualizacion ? new Date(transaccion.fecha_actualizacion) : null
    };
}

export const toPrismaTransaccion = (transaccion: Transaccion) => {
    return{
        id_transacciones: transaccion.idTransacciones,
        id_usuario: transaccion.idUsuario,
        id_categoria: transaccion.idCategoria,
        id_metodo_pago: transaccion.idMetodoPago,
        id_cuenta: transaccion.idCuenta,
        monto: transaccion.monto,
        tipo: transaccion.tipo,
        descripcion: transaccion.descripcion,
        estado_auditoria: transaccion.estadoAuditoria,
        fecha_actualizacion: transaccion.fechaActualizacion ? transaccion.fechaActualizacion.toISOString() : null
    }
}