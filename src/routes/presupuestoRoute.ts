import express, { Router } from "express";
import { actualizarPrespuesto, eliminarPresupuesto, insertarPresupuesto, listarPresupuestos, obtenerPresupuesto } from "../controllers/presupuestoController";
import { authMiddleware } from "../auth/auth.middleware";

const router: Router = express.Router();

router.get('/', authMiddleware, listarPresupuestos);
router.get('/:id', authMiddleware, obtenerPresupuesto);
router.post('/', authMiddleware, insertarPresupuesto);
router.put('/:id', authMiddleware, actualizarPrespuesto);
router.delete('/:id', authMiddleware, eliminarPresupuesto);

export default router;