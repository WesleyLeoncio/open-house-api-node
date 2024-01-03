import express from "express";
import { AvaliacaoController } from "#avaliacao/controller/avaliacaoController.js";
import { permissoes } from "#_middleware/verificarToken.js";

const router = express.Router();

router.get('/avaliacoes',permissoes(['ROLE_USER']), AvaliacaoController.buscarTodasAvaliacoes);
router.get('/avaliacoes/user/:id',permissoes(['ROLE_USER']), AvaliacaoController.buscarTodasAvaliacoesPorUsuario);
router.post('/avaliacoes',permissoes(['ROLE_USER']), AvaliacaoController.realizarAvaliacao);
router.get('/avaliacoes/nota/:filmeId/:usuarioId',permissoes(['ROLE_USER']), AvaliacaoController.buscarNotaAvaliacao);


export default router;