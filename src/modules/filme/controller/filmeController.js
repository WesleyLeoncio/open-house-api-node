import {FilmeService} from '#filme/service/filmeService.js';

class FilmeController {

    static async buscarTodosFilmes(req, res, next) {
        FilmeService.findAll()
            .then(objs => res.json(objs))
            .catch(next);
    }

    static async buscarFilmePorId(req, res, next) {
        FilmeService.findById(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async cadastrarFilme(req, res, next) {
        FilmeService.create(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async editarFilme(req, res, next) {
        FilmeService.update(req)
            .then(obj => res.json(obj))
            .catch(next);
    }


    static async removerFilme(req, res, next) {
        FilmeService.delete(req)
            .then(obj => res.json(obj))
            .catch(next);
    }
}

export {FilmeController}