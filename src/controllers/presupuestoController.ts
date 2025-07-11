import { Request, Response } from "express";
import * as presupuestoService from "../services/presupuestoService";
import { ResponseModel } from "../shared/responseModel";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND } from "../shared/constans";
import { presupuestoCrearSchema } from "../schemas/presupuestoSchema";
import { Presupuesto } from "../models/presupuesto";

export const listarPresupuestos = async (req: Request, res: Response): Promise<any> => {
    try {
        const idUsuario = (req as any).user.id;
        const presupuesto = await presupuestoService.listarPresupuestos(idUsuario);
        res.json(ResponseModel.success(presupuesto));
    } catch (error: any) {
        console.log('Error al listar presupuestos:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const obtenerPresupuesto = async (req: Request, res: Response): Promise<any> => {
    try {
        const idUsuario = (req as any).user.id;
        const {id} = req.params;
        const presupuesto = await presupuestoService.obtenerPresupuesto(Number(id));

        if (!presupuesto || presupuesto.idUsuario !== idUsuario) {
            return res.status(STATUS_NOT_FOUND).json(ResponseModel.error("Presupuesto no encontrado o no pertenece al usuario."));
        }
        res.json(ResponseModel.success(presupuesto));
    } catch (error: any) {
        console.log('Error al obtener presupuesto:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const insertarPresupuesto = async (req: Request, res: Response): Promise<any> => {
    const { error }: any = presupuestoCrearSchema.validate(req.body);
    if(error){
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const idUsuario = (req as any).user.id;
        const nuevoPresupuesto: Presupuesto = { ...req.body, idUsuario };
        const response = await presupuestoService.insertarPresupuesto(nuevoPresupuesto);
        res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        console.log('Error al insertar presupuesto:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const actualizarPrespuesto = async (req: Request, res: Response): Promise<any> => {
    try {
        const idUsuario = (req as any).user.id;
        const { id } = req.params;

        const presupuestoExistente = await presupuestoService.obtenerPresupuesto(Number(id));
        if (!presupuestoExistente || presupuestoExistente.idUsuario !== idUsuario) {
            return res.status(STATUS_NOT_FOUND).json(ResponseModel.error("Presupuesto no encontrado o no pertenece al usuario."));
        }
        const datosActualizados: Presupuesto = { ...req.body, idUsuario };

        const response = await presupuestoService.actualizarPrespuesto(Number(id), datosActualizados);
        res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        console.log('Error al actualizar presupuesto:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const eliminarPresupuesto = async (req: Request, res: Response): Promise<any> => {
    try {
        const idUsuario = (req as any).user.id;
        const { id } = req.params;

        const presupuestoExistente = await presupuestoService.obtenerPresupuesto(Number(id));
        if (!presupuestoExistente || presupuestoExistente.idUsuario !== idUsuario) {
            return res.status(STATUS_NOT_FOUND).json(ResponseModel.error("Presupuesto no encontrado o no pertenece al usuario."));
        }
        const response = await presupuestoService.eliminarPresupuesto(Number(id));
        res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        console.log('Error al eliminar presupuesto:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}




