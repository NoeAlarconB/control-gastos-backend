import { cuentas_bancarias } from "@prisma/client";
import { CuentaBancaria } from "../models/cuentaBancaria";

export const fromPrismaCuentaBancaria = (cuentaBancaria: cuentas_bancarias) => {
    return {
        idCuenta: cuentaBancaria.id_cuenta,
        idUsuario: cuentaBancaria.id_usuario,
        nombre: cuentaBancaria.nombre,
        saldo: cuentaBancaria.saldo,
        estadoAuditoria: cuentaBancaria.estado_auditoria,
        fechaCreacion: cuentaBancaria.fecha_creacion ? new Date(cuentaBancaria.fecha_creacion) : null,
        fechaActualizacion: cuentaBancaria.fecha_actualizacion ? new Date(cuentaBancaria.fecha_actualizacion) : null
    };
}

export const toPrismaCuentaBancaria = (cuentaBancaria: CuentaBancaria) => {
    return{
        id_cuenta: cuentaBancaria.idCuenta,
        id_usuario: cuentaBancaria.idUsuario,
        nombre: cuentaBancaria.nombre,
        saldo: cuentaBancaria.saldo,
        estado_auditoria: cuentaBancaria.estadoAuditoria,
        fecha_actualizacion: cuentaBancaria.fechaActualizacion ? cuentaBancaria.fechaActualizacion.toISOString() : null
    }
}