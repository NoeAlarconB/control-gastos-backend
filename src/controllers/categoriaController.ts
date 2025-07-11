import { Request, Response } from "express";
import * as categoriaService from "../services/categoriaService";
import { ResponseModel } from "../shared/responseModel";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND } from "../shared/constans";
import { categoriaCrearSchema } from "../schemas/categoriaSchema";
import { Categoria } from "../models/categoria";


export const listarCategorias = async (req: Request, res: Response): Promise<any> => {
    console.log('categoriasController::listarCategorias')
    try {
        const idUsuario = (req as any).user.id;
        const categorias = await categoriaService.listarCategorias(idUsuario);
        res.json(ResponseModel.success(categorias));
    } catch (error: any) {
        console.log('Error al listar categorias:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const obtenerCategoria = async (req: Request, res: Response): Promise<any> => {
    console.log('categoriasController::obtenerCategorias')
    try {
        const idUsuario = (req as any).user.id;
        const {id} = req.params;
        const categorias = await categoriaService.obtenerCategoria(Number(id));

        if (!categorias || categorias.idUsuario !== idUsuario) {
            return res.status(STATUS_NOT_FOUND).json(ResponseModel.error("Categoría no encontrada o no pertenece al usuario."));
        }
        res.json(ResponseModel.success(categorias));
    } catch (error: any) {
        console.log('Error al obtener categoria:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const insertCategoria = async (req: Request, res: Response): Promise<any> => {
    console.log('categoriasController::insertCategorias')
    const { error }: any = categoriaCrearSchema.validate(req.body);
    if(error){
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const idUsuario = (req as any).user.id;
        const nuevaCategoria = { ...req.body, idUsuario };
        const response = await categoriaService.insertCategoria(nuevaCategoria);
        res.json(ResponseModel.success(null, response));
        console.log('Categorias :', response);
    } catch (error: any) {
        console.log('Error al insertar categoria:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const actualizarCategoria = async (req: Request, res: Response): Promise<any> => {
    console.log('categoriasController::actualizarCategorias')
    try {
        const idUsuario = (req as any).user.id;
        const { id } = req.params;

        const categoriaExistente = await categoriaService.obtenerCategoria(Number(id));
        if (!categoriaExistente || categoriaExistente.idUsuario !== idUsuario) {
            return res.status(STATUS_NOT_FOUND).json(
                ResponseModel.error("Categoría no encontrada o no pertenece al usuario."));
        }
        const datosActualizados: Categoria = { ...req.body, idUsuario };
        const response = await categoriaService.actualizarCategoria(Number(id), datosActualizados);
        res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        console.log('Error al actualizar categoria:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const eliminarCategoria = async (req: Request, res: Response): Promise<any> => {
    console.log('categoriasController::eliminarCategorias')
    try {
        const idUsuario = (req as any).user.id;
        const { id } = req.params;

        const categoriaExistente = await categoriaService.obtenerCategoria(Number(id));
        if (!categoriaExistente || categoriaExistente.idUsuario !== idUsuario) {
            return res.status(STATUS_NOT_FOUND).json(
                ResponseModel.error("Categoría no encontrada o no pertenece al usuario."));
        }

        const response = await categoriaService.eliminarCategoria(Number(id));
        res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        console.log('Error al eliminar categoria:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}





