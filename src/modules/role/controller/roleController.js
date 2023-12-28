import { RoleService } from "#role/service/roleService.js";

export class RoleController {
    static async buscarTodasRoles(req, res, next) {
        RoleService.findAll(req)
            .then(objs => res.json(objs))
            .catch(next);
    }

    static async buscarRolePorId(req, res, next) {
        RoleService.findById(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async cadastrarRole(req, res, next) {
        RoleService.create(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async editarRole(req, res, next) {
        RoleService.update(req)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async removerRole(req, res, next) {
        RoleService.delete(req)
            .then(obj => res.json(obj))
            .catch(next);
    }
}