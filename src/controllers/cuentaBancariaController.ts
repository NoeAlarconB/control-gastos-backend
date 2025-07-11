import { Request, Response } from "express";
import * as cuentaBancariaService from "../services/cuentaBancariaServices";
import { ResponseModel } from "../shared/responseModel";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND } from "../shared/constans";
import { cuentaBancariaCrearSchema } from "../schemas/cuentaBancariaSchema";
import { CuentaBancaria } from "../models/cuentaBancaria";

export const listarCuentasBancarias = async (req: Request, res: Response): Promise<any> => {
    console.log('cuentaBancariaController::listarCuentasBancarias')
    try {
        const idUsuario = (req as any).user.id;
        const cuentaBancaria = await cuentaBancariaService.listarCuentasBancarias(idUsuario); 
        console.log('Cuentas bancarias listadas:', cuentaBancaria);
        res.json(ResponseModel.success(cuentaBancaria));
    } catch (error: any) {
        console.log('Error al listar cuentas bancarias:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const obtenerCuentaBancaria = async (req: Request, res: Response): Promise<any> => {
    console.log('cuentaBancariaController::obtenerCuentaBancaria')
    try {
        const idUsuario = (req as any).user.id;
        const {id} = req.params;
        const cuentaBancaria = await cuentaBancariaService.obtenerCuentaBancaria(Number(id));
        console.log('Cuentas bancarias obtenida:', cuentaBancaria);
        if (!cuentaBancaria || cuentaBancaria.idUsuario !== idUsuario) {
            return res.status(STATUS_NOT_FOUND).json(
                ResponseModel.error('Cuenta no encontrada o no pertenece al usuario.'));
        }
        res.json(ResponseModel.success(cuentaBancaria));
    } catch (error: any) {
        console.log('Error al obtener cuentas bancarias:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const insertarCuentaBancaria = async (req: Request, res: Response): Promise<any> => {
    console.log('cuentaBancariaController::insertarCuentaBancaria')
    const { error }: any = cuentaBancariaCrearSchema.validate(req.body);
    if(error){
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const idUsuario = (req as any).user.id; // viene del token
        const cuentaData = { ...req.body, idUsuario};
        const response = await cuentaBancariaService.insertarCuentaBancaria(cuentaData);
        console.log('Cuentas bancarias :', response);
        res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        console.log('Error al insertar cuentas bancarias:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const actualizarCuentaBancaria = async (req: Request, res: Response): Promise<any> => {
    console.log('cuentaBancariaController::actualizarCuentaBancaria')
    try {
        const idUsuario = (req as any).user.id;
        const { id } = req.params;
        const cuentaExistente = await cuentaBancariaService.obtenerCuentaBancaria(Number(id));
        if (!cuentaExistente || cuentaExistente.idUsuario !== idUsuario) {
            return res.status(STATUS_NOT_FOUND).json(ResponseModel.error('Cuenta no encontrada o no pertenece al usuario.'));
        }
        const cuentaActualizada: CuentaBancaria = {////
            ...req.body,
            idUsuario
        };
        const response = await cuentaBancariaService.actualizarCuentaBancaria(Number(id), cuentaActualizada);
        console.log('Cuentas bancarias :', response);
        res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        console.log('Error al actualizar cuentas bancarias:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const eliminarCuentaBancaria = async (req: Request, res: Response): Promise<any> => {
    console.log('cuentaBancariaController::eliminarCuentaBancaria')
    try {
        const idUsuario = (req as any).user.id;
        const { id } = req.params;

        const cuentaExistente = await cuentaBancariaService.obtenerCuentaBancaria(Number(id));
        if (!cuentaExistente || cuentaExistente.idUsuario !== idUsuario) {
            return res.status(STATUS_NOT_FOUND).json(ResponseModel.error('Cuenta no encontrada o no pertenece al usuario.'));
        }
        const response = await cuentaBancariaService.eliminarCuentaBancaria(Number(id));
        console.log('Cuentas bancarias :', response);
        res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        console.log('Error al eliminar cuentas bancarias:', error);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}




