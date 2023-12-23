import express from 'express';

import {FilmeController} from '#filme/controller/filmeController.js';

const router = express.Router();

router.get('/filmes', FilmeController.buscarTodosFilmes);
router.get('/filme/:id', FilmeController.buscarFilmePorId);
router.post('/filme', FilmeController.cadastrarFilme);
router.put('/filme/:id', FilmeController.editarFilme);
router.delete('/filme/:id', FilmeController.removerFilme);


export default router;