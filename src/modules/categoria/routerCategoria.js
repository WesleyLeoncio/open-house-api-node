import express from "express";

import { CategoriaController } from '#categoria/controller/categoriaController.js';

const router = express.Router();

router.get('/categorias', CategoriaController.buscarTodasCategorias);
router.get('/categoria/:id', CategoriaController.buscarCategoriaPorId);
router.post('/categoria', CategoriaController.cadastrarCategoria);
router.put('/categoria/:id', CategoriaController.editarCategoria);
router.delete('/categoria/:id', CategoriaController.removerCategoria);

export default router;