import { Request, Response } from "express";
import * as metodoPagoService from "../services/metodoPagoService";
import { ResponseModel } from "../shared/responseModel";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND } from "../shared/constans";
import { metodoPagoCrearSchema } from "../schemas/metodoPagoSchema";
import { MetodoPago } from '../models/metodosPagos';

export const listarMetodoDePagos = async (req: Request, res: Response): Promise<any> => {
    console.log('metodoPagoController::listarMetodoDePagos')
    try {
        const idUsuario = (req as any).user.id;
        const metodoPago = await metodoPagoService.listarMetodosDePagos(idUsuario);
        res.json(ResponseModel.success(metodoPago));
    } catch (error: any) {
        console.log('Error al listar metodos de pago:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const obtenerMetodoDePago = async (req: Request, res: Response): Promise<any> => {
    console.log('metodoPagoController::obtenerMetodoDePago')
    try {
        const idUsuario = (req as any).user.id;
        const {id} = req.params;
        const metodoPago = await metodoPagoService.obtenerMetodoDePago(Number(id));

        if (!metodoPago || metodoPago.idUsuario !== idUsuario) {
            return res.status(STATUS_NOT_FOUND).json(
                ResponseModel.error("Metodo de Pago no encontrado o no pertenece al usuario."));
        }
        res.json(ResponseModel.success(metodoPago));
    } catch (error: any) {
        console.log('Error al obtener el metodo de pago:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const insertarMetodoDePago = async (req: Request, res: Response): Promise<any> => {
    console.log('metodoPagoController::insertarMetodoDePago')
    const { error }: any = metodoPagoCrearSchema.validate(req.body);
    if(error){
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const idUsuario = (req as any).user.id;
        const nuevoMetodo: MetodoPago = { ...req.body, idUsuario };
        const response = await metodoPagoService.insertarMetodoDePago(nuevoMetodo);
        res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        console.log('Error al insertar metodo de pago:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const actualizarMetodoDePago = async (req: Request, res: Response): Promise<any> => {
    console.log('metodoPagoController::actualizarMetodoDePago')
    try {
        const idUsuario = (req as any).user.id;
        const { id } = req.params;

        const metodoPagoExistente = await metodoPagoService.obtenerMetodoDePago(Number(id));
        if (!metodoPagoExistente || metodoPagoExistente.idUsuario !== idUsuario) {
            return res.status(STATUS_NOT_FOUND).json(
                ResponseModel.error("Metodo de pago no encontrado o no pertenece al usuario."));
        }
        const datosActualizados: MetodoPago = { ...req.body, idUsuario };
        const response = await metodoPagoService.actualizarMetodoDePago(Number(id), datosActualizados);
        res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        console.log('Error al actualizar metodo de pago:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const eliminarMetodoDePago = async (req: Request, res: Response): Promise<any> => {
    console.log('metodoPagoController::eliminarMetodoDePago')
    try {
        const idUsuario = (req as any).user.id;
        const { id } = req.params;

        const metodoPagoExistente = await metodoPagoService.obtenerMetodoDePago(Number(id));
        if (!metodoPagoExistente || metodoPagoExistente.idUsuario !== idUsuario) {
            return res.status(STATUS_NOT_FOUND).json(
                ResponseModel.error("Metodo de pago no encontrada o no pertenece al usuario."));
        }
        const response = await metodoPagoService.eliminarMetodoDePago(Number(id));
        res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        console.log('Error al eliminar metodo de pago:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}




