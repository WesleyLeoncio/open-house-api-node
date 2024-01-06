import { FilmeService } from '#filme/service/filmeService.js';
import { Pageable } from "#utils/pageable.js";
import { FilmeCreatRequest } from "#filme/models/request/filmeCreatRequest.js";
import { FilmeEditRequest } from "#filme/models/request/filmeEditRequest.js";

class FilmeController {

    static async buscarTodosFilmes(req, res, next) {
        const pageable = new Pageable(req.query);
        FilmeService.findAll(pageable)
            .then(objs => res.json(objs))
            .catch(next);
    }

    static async buscarFilmePorId(req, res, next) {
        const { id } = req.params;
        FilmeService.findById(id)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async cadastrarFilme(req, res, next) {
        FilmeService.create(new FilmeCreatRequest(req.body))
            .then(obj => res.status(201).json(obj))
            .catch(next);
    }

    static async editarFilme(req, res, next) {
        FilmeService.update(new FilmeEditRequest(req))
            .then(obj => res.json(obj))
            .catch(next);
    }


    static async removerFilme(req, res, next) {
        const { id } = req.params;
        FilmeService.delete(id)
            .then(obj => res.status(204).json(obj))
            .catch(next);
    }
}

export { FilmeController }