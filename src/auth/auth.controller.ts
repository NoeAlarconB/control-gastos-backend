import { Request, Response } from 'express';
import * as loginService from './auth.service';
import { ResponseModel } from '../shared/responseModel';
import { STATUS_UNAUTHORIZED } from '../shared/constans';
import { registerUser } from './auth.service';


export const loginAuth  = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const token = await loginService.loginAuth(username, password);
        res.json(ResponseModel.success({ token }));
    } catch (error: any) {
        res.status(STATUS_UNAUTHORIZED).json(ResponseModel.error(error.message));
    }
};

export const registerAuth = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const newUser = await registerUser(username, email, password);
        res.status(201).json(ResponseModel.success(newUser));
    } catch (error: any) {
        res.status(400).json(ResponseModel.error(error.message));
    }
};