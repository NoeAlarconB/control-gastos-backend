import express, { Router } from "express";
import { actualizarUsuario, eliminarUsuario, insertUsuario, listarUsuarios, obtenerUsuario } from "../controllers/usuarioController";
import { authMiddleware } from "../auth/auth.middleware";

const router: Router = express.Router();

router.get('/', authMiddleware, listarUsuarios);
router.get('/:id', authMiddleware, obtenerUsuario);
router.post('/', authMiddleware, insertUsuario);
router.put('/:id', authMiddleware, actualizarUsuario);
router.delete('/:id', authMiddleware, eliminarUsuario);

export default router;