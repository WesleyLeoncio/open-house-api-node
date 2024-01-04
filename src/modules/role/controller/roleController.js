import { RoleService } from "#role/service/roleService.js";
import { Pageable } from "#utils/pageable.js";
import { RoleCreatRequest } from "#role/models/request/roleCreatRequest.js";
import { RoleEditRequest } from "#role/models/request/roleEditRequest.js";

export class RoleController {
    static async buscarTodasRoles(req, res, next) {
        const pageable = new Pageable(req.query);
        RoleService.findAll(pageable)
            .then(objs => res.json(objs))
            .catch(next);
    }

    static async buscarRolePorId(req, res, next) {
        const { id } = req.params;
        RoleService.findById(id)
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async cadastrarRole(req, res, next) {
        RoleService.create(new RoleCreatRequest(req.body))
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async editarRole(req, res, next) {
        RoleService.update(new RoleEditRequest(req))
            .then(obj => res.json(obj))
            .catch(next);
    }

    static async removerRole(req, res, next) {
        const { id } = req.params;
        RoleService.delete(id)
            .then(obj => res.json(obj))
            .catch(next);
    }
}