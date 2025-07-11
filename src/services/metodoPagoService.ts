import { metodos_pago, PrismaClient } from "@prisma/client";
import { MetodoPago } from '../models/metodosPagos';
import { RESPONSE_DELETE_OK, RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK } from "../shared/constans";
import { fromPrismaMetodoPago, toPrismaMetodoPago } from "../mappers/metodoPago.mapper";


const prisma = new PrismaClient();

export const listarMetodosDePagos = async(idUsuario: number) => {
    const metodosPago: metodos_pago[] = await prisma.metodos_pago.findMany({
        where:{
            estado_auditoria: '1',
            id_usuario: idUsuario
        },
        orderBy: {
            id_metodo_pago: 'asc'
        }
    });
    return metodosPago.map((metodoPago: metodos_pago) => fromPrismaMetodoPago(metodoPago));
}

export const obtenerMetodoDePago = async(id: number) => {
    const metodosPago: metodos_pago | null = await prisma.metodos_pago.findUnique({
        where: {
            id_metodo_pago: id
        }
    });
    return metodosPago ? fromPrismaMetodoPago(metodosPago) : null;
}

export const insertarMetodoDePago = async(metodosPago: MetodoPago) => {
    await prisma.metodos_pago.create({
        data: toPrismaMetodoPago(metodosPago)
    });
    return RESPONSE_INSERT_OK;
}

export const actualizarMetodoDePago = async(id: number, metodosPago: MetodoPago) => {
    const dataActualizada: MetodoPago = {...metodosPago, fechaActualizacion: new Date()};
    await prisma.metodos_pago.update({
        where: {
            id_metodo_pago: id
        },
        data: toPrismaMetodoPago(dataActualizada)
    });
    return RESPONSE_UPDATE_OK;
}

export const eliminarMetodoDePago = async(id: number) => {
    await prisma.metodos_pago.update({
        where: {
            id_metodo_pago: id
        },
        data: {
            estado_auditoria: '0',
            fecha_actualizacion: new Date()
        }
    });
    return RESPONSE_DELETE_OK;
}
