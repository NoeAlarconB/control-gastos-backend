import { cuentas_bancarias, PrismaClient } from "@prisma/client";
import { CuentaBancaria } from '../models/cuentaBancaria';
import { RESPONSE_DELETE_OK, RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK } from "../shared/constans";
import { fromPrismaCuentaBancaria, toPrismaCuentaBancaria } from "../mappers/cuentaBancaria.mapper";


const prisma = new PrismaClient();

export const listarCuentasBancarias = async(idUsuario: number) => {
    const cuentasBancarias: cuentas_bancarias[] = await prisma.cuentas_bancarias.findMany({
        where:{ estado_auditoria: '1', id_usuario: idUsuario  },
        orderBy: { id_cuenta: 'asc' }
    });
    return cuentasBancarias.map((cuentaBancaria: cuentas_bancarias) => fromPrismaCuentaBancaria(cuentaBancaria));
}

export const obtenerCuentaBancaria = async(id: number) => {
    const cuentaBancaria: cuentas_bancarias | null = await prisma.cuentas_bancarias.findUnique({
        where: {
            id_cuenta: id
        }
    });
    return cuentaBancaria ? fromPrismaCuentaBancaria(cuentaBancaria) : null;
}

export const insertarCuentaBancaria = async(cuentaBancaria: CuentaBancaria) => {
    const yaExiste = await prisma.cuentas_bancarias.findFirst({
        where: {
            nombre: cuentaBancaria.nombre,
            id_usuario: cuentaBancaria.idUsuario,
            estado_auditoria: '1'
        }
    });
    if (yaExiste) {
        throw new Error('Ya existe una cuenta con ese nombre');
    }
    await prisma.cuentas_bancarias.create({
        data: toPrismaCuentaBancaria(cuentaBancaria)
    });
    return RESPONSE_INSERT_OK;
}

export const actualizarCuentaBancaria = async(id: number, cuentaBancaria: CuentaBancaria) => {
    const existente = await prisma.cuentas_bancarias.findUnique({
        where: { id_cuenta: id }
    });
    if (!existente) {
        throw new Error('Cuenta bancaria no encontrada');
    }
    const duplicado = await prisma.cuentas_bancarias.findFirst({
        where: {
            id_cuenta: { not: id },
            nombre: cuentaBancaria.nombre,
            id_usuario: cuentaBancaria.idUsuario,
            estado_auditoria: '1'
        }
    });
    if (duplicado) {
        throw new Error('Ya existe otra cuenta con ese nombre');
    }
    const dataActualizada: CuentaBancaria = {...cuentaBancaria, fechaActualizacion: new Date()};
    await prisma.cuentas_bancarias.update({
        where: { id_cuenta: id },
        data: toPrismaCuentaBancaria(dataActualizada)
    });
    return RESPONSE_UPDATE_OK;
}

export const eliminarCuentaBancaria = async(id: number) => {
    await prisma.cuentas_bancarias.update({
        where: {
            id_cuenta: id
        },
        data: {
            estado_auditoria: '0', 
            fecha_actualizacion: new Date()
        }
    });
    return RESPONSE_DELETE_OK;
}
