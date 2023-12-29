import { Pageable } from "#utils/pageable.js";
import { Usuario } from "#usuario/models/entity/usuario.js";
import { UsuarioResponse } from "#usuario/models/response/usuarioResponse.js";
import sequelize from "#config/database-connection.js";
import { Role } from "#role/models/entity/role.js";
import { RoleResponse } from "#role/models/response/roleResponse.js";

export class UsuarioService {

    static async findAll(req) {
        const pageable = new Pageable(req.query);
        return await Usuario.findAndCountAll({
            include: {all: true, nested: true},
            distinct: true,
            limit: pageable.limit,
            offset: pageable.offset,
            where: pageable.getFilter('nome'),

        })
            .then(data =>
                pageable.getPagingData(data.count, data.rows.map(u => new UsuarioResponse(u))));
    }

    static async findById(req) {
        const {id} = req.params;
        const usuario = await Usuario.findByPk(id, {include: {all: true, nested: true}});
        return new UsuarioResponse(usuario);
    }


    static async create(req) {
        const {nome, login, senha, roles} = req.body;

        const transactionBD = await sequelize.transaction();
        const usuario = await Usuario.create({
            nome,
            login,
            senha,
            status: true
        }, {transaction: transactionBD});
        try {
            await Promise.all(roles.map(role => usuario.addRoles(Role.build(role), {transaction: transactionBD})));
            transactionBD.commit();
        } catch (error) {
            await transactionBD.rollback();
            throw "Ouve um erro em uma das roles!";
        }

        return new UsuarioResponse(await Usuario.findByPk(usuario.id, {include: {all: true, nested: true}}));
    }

    static async createUserComum(req) {
        const {nome, login, senha} = req.body;

        const transactionBD = await sequelize.transaction();
        const usuario = await Usuario.create({
            nome,
            login,
            senha,
            status: true
        }, {transaction: transactionBD});
        try {
            const roleUser = await Role.findByPk(3, {transaction: transactionBD});
            await usuario.addRoles(Role.build(new RoleResponse(roleUser)), {transaction: transactionBD});
            transactionBD.commit();
        } catch (error) {
            await transactionBD.rollback();
            throw "Ouve um erro em uma das roles!";
        }

        return new UsuarioResponse(await Usuario.findByPk(usuario.id, {include: {all: true, nested: true}}));
    }

    static async update(req) {
        const {id} = req.params;
        const {nome, login, senha, roles} = req.body;

        const usuario = await Usuario.findByPk(id, {include: {all: true, nested: true}});
        if (usuario == null) throw "Usuario não encontrado!";
        const transactionBD = await sequelize.transaction();
        Object.assign(usuario, {nome, login, senha, status: true});
        await usuario.save({transaction: transactionBD});
        try {
            await sequelize.models.profile.destroy({where: {usuarioId: usuario.id}, transaction: transactionBD});
            await Promise.all(roles.map(role => usuario.addRoles(Role.build(role), {transaction: transactionBD})));
            transactionBD.commit();
        } catch (error) {
            await transactionBD.rollback();
            throw "Ouve um erro em uma das Roles!";
        }

        return new UsuarioResponse(await Usuario.findByPk(usuario.id, {include: {all: true, nested: true}}));
    }

    static async delete(req) {
        const {id} = req.params;
        const usuario = await Usuario.findByPk(id, {include: {all: true, nested: true}});
        if (usuario == null)
            throw 'Usuario não encontrado!';
        try {
            await usuario.destroy();
            return new UsuarioResponse(usuario);
        } catch (error) {
            throw "Erro ao tentar deletar usuario!";
        }
    }
}