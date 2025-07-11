import express, { Router } from "express";
import { actualizarCuentaBancaria, eliminarCuentaBancaria, insertarCuentaBancaria, listarCuentasBancarias, obtenerCuentaBancaria } from "../controllers/cuentaBancariaController";
import { authMiddleware } from "../auth/auth.middleware";

const router: Router = express.Router();

router.get('/', authMiddleware, listarCuentasBancarias);
router.get('/:id', authMiddleware, obtenerCuentaBancaria);
router.post('/', authMiddleware, insertarCuentaBancaria);
router.put('/:id', authMiddleware, actualizarCuentaBancaria);
router.delete('/:id', authMiddleware, eliminarCuentaBancaria);

export default router;