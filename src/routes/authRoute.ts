import express, { Router } from "express";
import { loginAuth, registerAuth } from "../auth/auth.controller";

const router: Router = express.Router();

router.post('/login', loginAuth);
router.post('/register', registerAuth);

export default router;