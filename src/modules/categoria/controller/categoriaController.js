import { CategoriaService } from "#categoria/service/categoriaService.js";

class CategoriaController {

    static async buscarTodasCategorias(req, res, next) {
        CategoriaService.findAll(req)
            .then(objs => res.json(objs))
            .catch(next);
    }

    static async buscarCategoriaPorId(req, res, next) {
        CategoriaService.findById(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async cadastrarCategoria(req, res, next) {
        CategoriaService.create(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async editarCategoria(req, res, next) {
        CategoriaService.update(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async removerCategoria(req, res, next) {
        CategoriaService.delete(req)
            .then(obj => res.json(obj))
            .catch(next);
    }
}

export { CategoriaController }