import express, { Router } from "express";
import { actualizarMetodoDePago, eliminarMetodoDePago, insertarMetodoDePago, listarMetodoDePagos, obtenerMetodoDePago } from "../controllers/metodoPagoController";
import { authMiddleware } from "../auth/auth.middleware";

const router: Router = express.Router();

router.get('/', authMiddleware, listarMetodoDePagos);
router.get('/:id', authMiddleware, obtenerMetodoDePago);
router.post('/', authMiddleware, insertarMetodoDePago);
router.put('/:id', authMiddleware, actualizarMetodoDePago);
router.delete('/:id', authMiddleware, eliminarMetodoDePago);

export default router;