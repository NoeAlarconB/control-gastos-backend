import { categorias, PrismaClient } from "@prisma/client";
import { Categoria } from '../models/categoria';
import { RESPONSE_DELETE_OK, RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK } from "../shared/constans";
import { fromPrismaCategoria, toPrismaCategoria } from "../mappers/categoria.mapper";


const prisma = new PrismaClient();

export const listarCategorias = async(idUsuario: number) => {
    const categorias: categorias[] = await prisma.categorias.findMany({
        where: {
            estado_auditoria: '1',
            id_usuario: idUsuario
        },
        orderBy: {
            id_categoria: 'asc'
        }
    });
    return categorias.map((categoria: categorias) => fromPrismaCategoria(categoria));
}

export const obtenerCategoria = async(id: number) => {
    const categoria: categorias | null =await prisma.categorias.findUnique({
        where: {
            id_categoria: id
        }
    });
    return categoria ? fromPrismaCategoria(categoria) : null;
}

export const insertCategoria = async(categoria: Categoria) => {
    const existe = await prisma.categorias.findFirst({
        where: { nombre: categoria.nombre, tipo: categoria.tipo, estado_auditoria: '1', id_usuario: categoria.idUsuario
        }
    });
    if (existe) {
        throw new Error(`Ya existe una categoría con ese nombre y tipo.`);
    }
    await prisma.categorias.create({
        data: toPrismaCategoria(categoria)
    });
    return RESPONSE_INSERT_OK;
}

export const actualizarCategoria = async(id: number, categoria: Categoria) => {
    const existente = await prisma.categorias.findUnique({
        where: { id_categoria: id }
    });
    if (!existente) {
        throw new Error('Categoría no encontrada');
    }
    const duplicado = await prisma.categorias.findFirst({
        where: {
            id_categoria: { not: id },
            id_usuario: categoria.idUsuario,
            nombre: categoria.nombre,
            tipo: categoria.tipo,
            estado_auditoria: '1'
        }
    });
    if (duplicado) {
        throw new Error('Ya existe otra categoría con ese nombre y tipo');
    }
    const dataActualizada: Categoria = {...categoria, fechaActualizacion: new Date()}
    await prisma.categorias.update({
        where: {id_categoria: id},
        data: toPrismaCategoria(dataActualizada)
    });
    return RESPONSE_UPDATE_OK;
}

export const eliminarCategoria = async(id: number) => {
    await prisma.categorias.update({
        where: {
            id_categoria: id
        },
        data: {
            estado_auditoria: '0',
            fecha_actualizacion: new Date()
        }
    });
    return RESPONSE_DELETE_OK;
}
