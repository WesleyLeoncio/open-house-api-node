import express from "express";

import { CategoriaController } from '#categoria/controller/categoriaController.js';

const router = express.Router();

router.get('/categorias', CategoriaController.buscarTodasCategorias);
router.get('/categorias/:id', CategoriaController.buscarCategoriaPorId);
router.post('/categorias', CategoriaController.cadastrarCategoria);
router.put('/categorias/:id', CategoriaController.editarCategoria);
router.delete('/categorias/:id', CategoriaController.removerCategoria);

export default router;