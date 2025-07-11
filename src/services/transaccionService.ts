import { PrismaClient, transacciones } from "@prisma/client";
import { Transaccion } from '../models/transaccion';
import { RESPONSE_DELETE_OK, RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK } from "../shared/constans";
import { fromPrismaTransaccion, toPrismaTransaccion } from "../mappers/transaccion.mapper";

const prisma = new PrismaClient();

export const listarTransacciones = async(idUsuario: number) => {
    const transacciones: transacciones[] = await prisma.transacciones.findMany({
        where:{estado_auditoria: '1', id_usuario: idUsuario },
        orderBy: { id_transacciones: 'asc'},
        include: {
            categoria: true,
            metodo_pago: true,
            cuenta: true
        }
    });
    return transacciones.map((transaccion: transacciones) => fromPrismaTransaccion(transaccion));
}

export const obtenerTransaccion = async(id: number) => {
    const transaccion: transacciones | null = await prisma.transacciones.findUnique({
        where: { id_transacciones: id }
    });
    return transaccion ? fromPrismaTransaccion(transaccion) : null;
}

export const insertarTransaccion = async(transaccion: Transaccion) => {
    const categoria = await prisma.categorias.findUnique({
        where: { id_categoria: transaccion.idCategoria }
    });
    if (!categoria) throw new Error('Categoría no encontrada');
    transaccion.tipo = categoria.tipo;
    const presupuesto = await prisma.presupuestos.findFirst({
        where: {
            id_usuario: transaccion.idUsuario,
            id_categoria: transaccion.idCategoria,
            mes: new Date().getMonth() + 1,
            anio: new Date().getFullYear(),
            estado_auditoria: '1'
        }
    });
    if (!presupuesto) {
        throw new Error('No hay presupuesto asignado a la categoría');
    }
    const gastoMes = await prisma.transacciones.aggregate({
        _sum: { monto: true },
        where: {
            id_usuario:       transaccion.idUsuario,
            id_categoria:     transaccion.idCategoria,
            estado_auditoria: '1',
            tipo:             'gasto',
            fecha_creacion:   {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                lte: new Date()
            }
        }
    });
    const restante = Number(presupuesto.monto_maximo) - Number(gastoMes._sum.monto ?? 0);
    if (Number(transaccion.monto) > restante) {
        throw new Error(`El monto excede tu presupuesto. Disponible: S/ ${restante}`);
    }
    await prisma.transacciones.create({
        data: toPrismaTransaccion(transaccion)
    });
    return RESPONSE_INSERT_OK;
}

export const actualizarTransaccion = async(id: number, transaccion: Transaccion) => {
    const categoria = await prisma.categorias.findUnique({
        where: { id_categoria: transaccion.idCategoria }
        });
        if (!categoria) throw new Error('Categoría no encontrada');
        
        transaccion.tipo = categoria.tipo;
        
    const presupuesto = await prisma.presupuestos.findFirst({
        where: {
            id_usuario: transaccion.idUsuario,
            id_categoria: transaccion.idCategoria,
            mes: new Date().getMonth() + 1,
            anio: new Date().getFullYear(),
            estado_auditoria: '1'
        }
    });
    if (!presupuesto) throw new Error('No hay presupuesto asignado a la categoría');

    const gastoMes = await prisma.transacciones.aggregate({
        _sum: { monto: true },
        where: {
            id_usuario:       transaccion.idUsuario,
            id_categoria:     transaccion.idCategoria,
            estado_auditoria: '1',
            tipo:             'gasto',
            fecha_creacion:   {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                lte: new Date()      
            }
        }
    });
    const restante = Number(presupuesto.monto_maximo) - Number(gastoMes._sum.monto ?? 0);
    if (Number(transaccion.monto) > restante)
    throw new Error(`El monto excede tu presupuesto. Disponible: S/ ${restante}`);
    const dataActualizada: Transaccion = {...transaccion, fechaActualizacion: new Date()}
    await prisma.transacciones.update({
        where: {
            id_transacciones: id
        },
        data: toPrismaTransaccion(dataActualizada)
    });
    return RESPONSE_UPDATE_OK;
}

export const eliminarTransaccion = async(id: number) => {
    await prisma.transacciones.update({
        where: {
            id_transacciones: id
        },
        data:{
            estado_auditoria: '0',
            fecha_actualizacion: new Date()
        }
    });
    return RESPONSE_DELETE_OK;
}
