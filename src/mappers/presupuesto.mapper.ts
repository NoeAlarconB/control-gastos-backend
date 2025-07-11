import { presupuestos } from "@prisma/client";
import { Presupuesto } from "../models/presupuesto";

export const fromPrismaPresupuesto = (presupuesto: presupuestos & { categoria?: { nombre: string }}) => {
    return {
        idPresupuesto: presupuesto.id_presupuesto,
        idUsuario: presupuesto.id_usuario,
        nombreCategoria: presupuesto.categoria?.nombre || '',
        idCategoria: presupuesto.id_categoria,
        montoMaximo: presupuesto.monto_maximo,
        mes: presupuesto.mes,
        anio: presupuesto.anio,
        estadoAuditoria: presupuesto.estado_auditoria,
        fechaCreacion: presupuesto.fecha_creacion ? new Date(presupuesto.fecha_creacion) : null,
        fechaActualizacion: presupuesto.fecha_actualizacion ? new Date(presupuesto.fecha_actualizacion) : null
    };
}

export const toPrismaPresupuesto = (presupuesto: Presupuesto) => {
    return {
        id_presupuesto: presupuesto.idPresupuesto,
        id_usuario: presupuesto.idUsuario,
        id_categoria: presupuesto.idCategoria,
        monto_maximo: presupuesto.montoMaximo,
        mes: presupuesto.mes,
        anio: presupuesto.anio,
        estado_auditoria: presupuesto.estadoAuditoria,
        fecha_actualizacion: presupuesto.fechaActualizacion ? presupuesto.fechaActualizacion.toISOString() : null
    };
}