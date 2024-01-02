import express from "express";
import {AutenticacaoController} from "#autenticacao/controller/autenticacaoController.js";

const router = express.Router();

router.post('/login', AutenticacaoController.login);

export default router;