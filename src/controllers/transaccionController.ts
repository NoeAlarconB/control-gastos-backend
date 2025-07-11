import { Request, Response } from "express";
import * as trasaccionService from "../services/transaccionService";
import { ResponseModel } from "../shared/responseModel";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND } from "../shared/constans";
import { transaccionCrearSchema } from "../schemas/transaccionSchema";
import { Transaccion } from "../models/transaccion";

export const listarTransacciones = async (req: Request, res: Response): Promise<any> => {
    try {
        const idUsuario = (req as any).user.id;
        const transaccion = await trasaccionService.listarTransacciones(idUsuario);
        res.json(ResponseModel.success(transaccion));
    } catch (error: any) {
        console.log('Error al listar transacciones:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const obtenerTransaccion = async (req: Request, res: Response): Promise<any> => {
    try {
        const idUsuario = (req as any).user.id;
        const {id} = req.params;
        const transaccion = await trasaccionService.obtenerTransaccion(Number(id));

        if (!transaccion || transaccion.idUsuario !== idUsuario) {
            return res.status(STATUS_NOT_FOUND).json(ResponseModel.error("Transacción no encontrada o no pertenece al usuario."));
        }
        res.json(ResponseModel.success(transaccion));
    } catch (error: any) {
        console.log('Error al obtener transaccion:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const insertarTransaccion = async (req: Request, res: Response): Promise<any> => {
    const { error }: any = transaccionCrearSchema.validate(req.body);
    if(error){
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
    const idUsuario = (req as any).user.id;
    const nuevaTransaccion: Transaccion = { ...req.body, idUsuario };

    const response = await trasaccionService.insertarTransaccion(nuevaTransaccion);
    res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        console.log('Error al insertar transaccion:', error);
        res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message));
    }
}

export const actualizarTransaccion = async (req: Request, res: Response): Promise<any> => {
    try {
        const idUsuario = (req as any).user.id;
        const { id } = req.params;

        const transaccion = await trasaccionService.obtenerTransaccion(Number(id));
        if (!transaccion || transaccion.idUsuario !== idUsuario) {
            return res.status(STATUS_NOT_FOUND).json(ResponseModel.error("Transacción no encontrada o no pertenece al usuario."));
        }
        const actualizada: Transaccion = { ...req.body, idUsuario };
        const response = await trasaccionService.actualizarTransaccion(Number(id), actualizada);
        res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        console.log('Error al actualizar transaccion:', error);
        res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message));
    }
}

export const eliminarTransaccion = async (req: Request, res: Response): Promise<any> => {
    try {
        const idUsuario = (req as any).user.id;
        const { id } = req.params;

        const transaccion = await trasaccionService.obtenerTransaccion(Number(id));
        if (!transaccion || transaccion.idUsuario !== idUsuario) {
            return res.status(STATUS_NOT_FOUND).json(ResponseModel.error("Transacción no encontrada o no pertenece al usuario."));
        }
        const response = await trasaccionService.eliminarTransaccion(Number(id));
        res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        console.log('Error al eliminar transaccion:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}




