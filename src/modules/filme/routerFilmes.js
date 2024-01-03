import express from 'express';

import {FilmeController} from '#filme/controller/filmeController.js';

const router = express.Router();

router.get('/filmes', FilmeController.buscarTodosFilmes);
router.get('/filmes/:id', FilmeController.buscarFilmePorId);
router.post('/filmes', FilmeController.cadastrarFilme);
router.put('/filmes/:id', FilmeController.editarFilme);
router.delete('/filmes/:id', FilmeController.removerFilme);


export default router;