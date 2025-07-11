import { Request, Response } from "express";
import * as usuarioService from "../services/usuarioService";
import { ResponseModel } from "../shared/responseModel";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR } from "../shared/constans";
import { usuarioCrearSchema } from "../schemas/usuarioSchema";

export const listarUsuarios = async (req: Request, res: Response): Promise<any> => {
    try {
        const usuarios = await usuarioService.listarUsuarios();
        res.json(ResponseModel.success(usuarios));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const obtenerUsuario = async (req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;
        const usuarios = await usuarioService.obtenerUsuario(Number(id));
        res.json(ResponseModel.success(usuarios));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const insertUsuario = async (req: Request, res: Response): Promise<any> => {
    const { error }: any = usuarioCrearSchema.validate(req.body);
    if(error){
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const response = await usuarioService.insertUsuario(req.body);
        res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const actualizarUsuario = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const response = await usuarioService.actualizarUsuario(Number(id), req.body);
        res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const eliminarUsuario = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const response = await usuarioService.eliminarUsuario(Number(id));
        res.json(ResponseModel.success(null, response));
    } catch (error: any) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}




