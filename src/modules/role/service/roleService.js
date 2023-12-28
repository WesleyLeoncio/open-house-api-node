import { Pageable } from "#utils/pageable.js";
import { Role } from "#role/models/entity/role.js"
import { RoleResponse } from "#role/models/response/roleResponse.js";


export class RoleService {

    static async findAll(req) {
        const pageable = new Pageable(req.query);
        return await Role.findAndCountAll({
            where: pageable.getFilter('nome'),
            limit: pageable.limit,
            offset: pageable.offset})
            .then(data =>
                pageable.getPagingData(data.count, data.rows.map(r => new RoleResponse(r))));
    }

    static async findById(req) {
        const {id} = req.params;
        const role = await Role.findByPk(id);
        return new RoleResponse(role);
    }

    static async create(req) {
        const {nome} = req.body;
        const role = await Role.create({nome});
        return new RoleResponse(await Role.findByPk(role.id));
    }

    static async update(req) {
        const {id} = req.params;
        const {nome} = req.body;
        const role = await Role.findByPk(id);
        if (role == null)
            throw 'Role não encontrada!';
        Object.assign(role, {nome});
        await role.save();
        return new RoleResponse(await Role.findByPk(role.id));
    }

    static async delete(req) {
        const {id} = req.params;
        const role = await Role.findByPk(id);
        if (role == null)
            throw 'Role não encontrado!';
        try {
            await role.destroy();
            return new RoleResponse(role);
        } catch (error) {
            throw "Não é possível remover uma role associada a um usuario!";
        }
    }

}