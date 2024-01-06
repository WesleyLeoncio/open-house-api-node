import { UsuarioService } from "#usuario/service/usuarioService.js";
import { Pageable } from "#utils/pageable.js";
import { UsuarioCreatRequest } from "#usuario/models/request/usuarioCreatRequest.js";
import { UsuarioCreatComunRequest } from "#usuario/models/request/usuarioCreatComunRequest.js";
import { UsuarioEditRequest } from "#usuario/models/request/usuarioEditRequest.js";


export class UsuarioController {

    static async buscarTodosUsuarios(req, res, next) {
        const pageable = new Pageable(req.query);
        UsuarioService.findAll(pageable)
            .then(objs => res.json(objs))
            .catch(next);
    }

    static async buscarUsuarioPorId(req, res, next) {
        const {id} = req.params;
        UsuarioService.findById(id)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async cadastrarUsuario(req, res, next) {
        UsuarioService.create(new UsuarioCreatRequest(req.body))
            .then(obj => res.status(201).json(obj))
            .catch(next);
    }

    static async cadastrarUsuarioComum(req, res, next) {
        UsuarioService.createUserComum(new UsuarioCreatComunRequest(req.body))
            .then(obj => res.status(201).json(obj))
            .catch(next);
    }


    static async editarUsuario(req, res, next) {
        UsuarioService.update(new UsuarioEditRequest(req))
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async removerUsuario(req, res, next) {
        const {id} = req.params;
        UsuarioService.delete(id)
            .then(obj => res.status(204).json(obj))
            .catch(next);
    }
}