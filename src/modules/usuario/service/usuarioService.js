import { Usuario } from "#usuario/models/entity/usuario.js";
import { UsuarioResponse } from "#usuario/models/response/usuarioResponse.js";
import sequelize from "#config/database-connection.js";
import { Role } from "#role/models/entity/role.js";
import { RoleResponse } from "#role/models/response/roleResponse.js";
import { Bcrypt } from "#security/bcrypt.js";
import { UsuarioDetailedResponse } from "#usuario/models/response/usuarioDetailedResponse.js";
import { UsuarioBasicResponse } from "#usuario/models/response/usuarioBasicResponse.js";


export class UsuarioService {

    static async findAll(pageable) {

        return await Usuario.findAndCountAll({
            include: [
                {
                    model: Role,
                    as: 'roles',
                    attributes: ['id', 'nome'],
                    through: {
                        attributes: [],
                    }
                }
            ],
            distinct: true,
            limit: pageable.limit,
            offset: pageable.offset,
            where: pageable.getFilter('nome'),

        })
            .then(data =>
                pageable.getPagingData(data.count, data.rows.map(u => new UsuarioResponse(u))));
    }

    static async findById(id) {
        return new UsuarioDetailedResponse(await this.buscarUsuario(id));
    }


    static async create(usuarioResquest) {

        usuarioResquest.senha = await Bcrypt.passwordHash(usuarioResquest.senha);

        const transactionBD = await sequelize.transaction();
        const usuario = await Usuario.create(usuarioResquest.getUsuario(),
            {transaction: transactionBD});
        try {
            await Promise.all(usuarioResquest.getRoles().map(role => usuario.addRoles(Role.build(role), {transaction: transactionBD})));
            transactionBD.commit();
        } catch (error) {
            await transactionBD.rollback();
            throw "Ouve um erro em uma das roles!";
        }

        return new UsuarioResponse(await this.buscarUsuario(usuario.id));
    }

    static async createUserComum(usuarioResquest) {

        usuarioResquest.senha = await Bcrypt.passwordHash(usuarioResquest.senha);

        const transactionBD = await sequelize.transaction();
        const usuario = await Usuario.create(usuarioResquest, {transaction: transactionBD});
        try {
            const roleUser = await Role.findByPk(3, {transaction: transactionBD});
            await usuario.addRoles(Role.build(new RoleResponse(roleUser)), {transaction: transactionBD});
            transactionBD.commit();
        } catch (error) {
            await transactionBD.rollback();
            throw "Ouve um erro em uma das roles!";
        }

        return new UsuarioResponse(await this.buscarUsuario(usuario.id));
    }

    static async update(usuarioResquest) {

        usuarioResquest.senha = await Bcrypt.passwordHash(usuarioResquest.senha);

        const usuario = await this.buscarUsuario(usuarioResquest.id);
        if (usuario == null) throw "Usuario não encontrado!";
        const transactionBD = await sequelize.transaction();
        Object.assign(usuario, usuarioResquest.getUsuario());
        await usuario.save({transaction: transactionBD});
        try {
            await sequelize.models.profile.destroy({where: {usuarioId: usuario.id}, transaction: transactionBD});
            await Promise.all(usuarioResquest.getRoles().map(role => usuario.addRoles(Role.build(role), {transaction: transactionBD})));
            transactionBD.commit();
        } catch (error) {
            await transactionBD.rollback();
            throw "Ouve um erro em uma das Roles!";
        }

        return new UsuarioResponse(await this.buscarUsuario(usuario.id));
    }

    static async delete(id) {
        const usuario = await this.buscarUsuario(id);
        if (usuario == null)
            throw 'Usuario não encontrado!';
        try {
            await usuario.destroy();
            return new UsuarioResponse(usuario);
        } catch (error) {
            throw "Erro ao tentar deletar usuario!";
        }
    }

    static async buscarUsuario(id) {
        return await Usuario.findByPk(id, {
            include: [
                {
                    model: Role,
                    as: 'roles',
                    attributes: ['id', 'nome'],
                    through: {
                        attributes: [],
                    }
                }
            ],
        })
    }

    // TODO REFATORAR
    static async userByLogin(login) {
        const usuario = await Usuario.findOne({
            where: {login:login}
        });
        return new UsuarioBasicResponse(usuario);
    }
}