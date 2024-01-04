import { CategoriaService } from "#categoria/service/categoriaService.js";
import { Pageable } from "#utils/pageable.js";
import { CategoriaCreatRequest } from "#categoria/models/request/categoriaCreatRequest.js";
import { CategoriaEditRequest } from "#categoria/models/request/categoriaEditRequest.js";

export class CategoriaController {

    static async buscarTodasCategorias(req, res, next) {
        const pageable = new Pageable(req.query);
        CategoriaService.findAll(pageable)
            .then(objs => res.json(objs))
            .catch(next);
    }

    static async buscarCategoriaPorId(req, res, next) {
        const { id } = req.params;
        CategoriaService.findById(id)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async cadastrarCategoria(req, res, next) {
        CategoriaService.create(new CategoriaCreatRequest(req.body))
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async editarCategoria(req, res, next) {
        CategoriaService.update(new CategoriaEditRequest(req))
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async removerCategoria(req, res, next) {
        const { id } = req.params;
        CategoriaService.delete(id)
            .then(obj => res.json(obj))
            .catch(next);
    }
}

