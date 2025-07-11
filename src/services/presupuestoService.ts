import { presupuestos, PrismaClient } from "@prisma/client";
import { Presupuesto } from '../models/presupuesto';
import { RESPONSE_DELETE_OK, RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK } from "../shared/constans";
import { fromPrismaPresupuesto, toPrismaPresupuesto } from "../mappers/presupuesto.mapper";

const prisma = new PrismaClient();

export const listarPresupuestos = async(idUsuario: number) => {
    const presupuesto: presupuestos[] = await prisma.presupuestos.findMany({
        where:{
            estado_auditoria: '1',
            id_usuario: idUsuario
        },
        orderBy: {
            id_presupuesto: 'asc'
        },
        include: {
            categoria: true
        }
    });
    return presupuesto.map((presupuesto: presupuestos) => fromPrismaPresupuesto(presupuesto));
}

export const obtenerPresupuesto = async(id: number) => {
    const presupuesto: presupuestos | null = await prisma.presupuestos.findUnique({
        where: { id_presupuesto: id }
    });
    return presupuesto ? fromPrismaPresupuesto(presupuesto) : null;
}

export const insertarPresupuesto = async(presupuesto: Presupuesto) => {
    const existe = await prisma.presupuestos.findFirst({
        where: {
            id_usuario: presupuesto.idUsuario,
            id_categoria: presupuesto.idCategoria,
            mes: presupuesto.mes,
            anio: presupuesto.anio,
            estado_auditoria: '1'
        }
    });
    if (existe) {
        throw new Error('Ya existe un presupuesto para esta categoría en ese mes y año');
    }
    await prisma.presupuestos.create({
        data: toPrismaPresupuesto(presupuesto)
    });
    return RESPONSE_INSERT_OK;
}

export const actualizarPrespuesto = async(id: number, presupuesto: Presupuesto) => {
    const existente = await prisma.presupuestos.findUnique({
        where: { id_presupuesto: id }
    });
    if (!existente) {
        throw new Error('Presupuesto no encontrada');
    }
    const duplicado = await prisma.presupuestos.findFirst({
        where: {
            id_presupuesto: { not: id },
            id_usuario: presupuesto.idUsuario,
            id_categoria: presupuesto.idCategoria,
            mes: presupuesto.mes,
            anio: presupuesto.anio,
            estado_auditoria: '1'
        }
    });
    if (duplicado) {
        throw new Error('Ya existe otro presupuesto con ese nombre y tipo');
    }

    const dataActualizado: Presupuesto = {...presupuesto, fechaActualizacion: new Date()}
    await prisma.presupuestos.update({
        where: { id_presupuesto: id },
        data: toPrismaPresupuesto(dataActualizado)
    });
    return RESPONSE_UPDATE_OK;
}

export const eliminarPresupuesto = async(id: number) => {
    await prisma.presupuestos.update({
        where: { id_presupuesto: id },
        data: { estado_auditoria: '0' }
    });
    return RESPONSE_DELETE_OK;
}
