import express, { Router } from "express";
import { actualizarCategoria, eliminarCategoria, insertCategoria, listarCategorias, obtenerCategoria } from "../controllers/categoriaController";
import { authMiddleware } from "../auth/auth.middleware";

const router: Router = express.Router();

router.get('/', authMiddleware, listarCategorias);
router.get('/:id', authMiddleware, obtenerCategoria);
router.post('/', authMiddleware, insertCategoria);
router.put('/:id', authMiddleware, actualizarCategoria);
router.delete('/:id', authMiddleware, eliminarCategoria);

export default router;