import express from 'express';

import { FilmeController } from '#filme/controller/filmeController.js';
import { permissoes } from "#_middleware/verificarToken.js";

const router = express.Router();

router.get('/filmes', permissoes(['ROLE_USER']), FilmeController.buscarTodosFilmes);
router.get('/filmes/:id', permissoes(['ROLE_USER']), FilmeController.buscarFilmePorId);
router.post('/filmes', permissoes(['ROLE_ADMIN']), FilmeController.cadastrarFilme);
router.put('/filmes/:id', permissoes(['ROLE_ADMIN']), FilmeController.editarFilme);
router.delete('/filmes/:id', permissoes(['ROLE_ADMIN']), FilmeController.removerFilme);


export default router;