import express, { Router } from "express";
import { actualizarTransaccion, eliminarTransaccion, insertarTransaccion, listarTransacciones, obtenerTransaccion } from "../controllers/transaccionController";
import { authMiddleware } from "../auth/auth.middleware";

const router: Router = express.Router();

router.get('/', authMiddleware, listarTransacciones);
router.get('/:id', authMiddleware, obtenerTransaccion);
router.post('/', authMiddleware, insertarTransaccion);
router.put('/:id', authMiddleware, actualizarTransaccion);
router.delete('/:id', authMiddleware, eliminarTransaccion);

export default router;