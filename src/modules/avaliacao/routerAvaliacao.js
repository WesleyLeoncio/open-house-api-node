import express from "express";
import { AvaliacaoController } from "#avaliacao/controller/avaliacaoController.js";

const router = express.Router();

router.get('/avaliacoes', AvaliacaoController.buscarTodasAvaliacoes);
router.get('/avaliacoes/user/:id', AvaliacaoController.buscarTodasAvaliacoesPorUsuario);
router.post('/avaliacoes', AvaliacaoController.realizarAvaliacao);
// router.put('/categoria/:id', CategoriaController.editarCategoria);
// router.delete('/categoria/:id', CategoriaController.removerCategoria);


export default router;