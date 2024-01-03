import express from "express";

import { CategoriaController } from '#categoria/controller/categoriaController.js';
import { permissoes } from "#_middleware/verificarToken.js";

const router = express.Router();

router.get('/categorias', permissoes(['ROLE_ADMIN']), CategoriaController.buscarTodasCategorias);
router.get('/categorias/:id', permissoes(['ROLE_ADMIN']), CategoriaController.buscarCategoriaPorId);
router.post('/categorias', permissoes(['ROLE_ADMIN']), CategoriaController.cadastrarCategoria);
router.put('/categorias/:id', permissoes(['ROLE_ADMIN']), CategoriaController.editarCategoria);
router.delete('/categorias/:id', permissoes(['ROLE_ADMIN']), CategoriaController.removerCategoria);

export default router;