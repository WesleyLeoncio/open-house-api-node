import { UsuarioService } from "#usuario/service/usuarioService.js";


export class UsuarioController {

    static async buscarTodosUsuarios(req, res, next) {
        UsuarioService.findAll(req)
            .then(objs => res.json(objs))
            .catch(next);
    }

    static async buscarUsuarioPorId(req, res, next) {
        UsuarioService.findById(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async cadastrarUsuario(req, res, next) {
        UsuarioService.create(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async editarUsuario(req, res, next) {
        UsuarioService.update(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async removerUsuario(req, res, next) {
        UsuarioService.delete(req)
            .then(obj => res.json(obj))
            .catch(next);
    }
}