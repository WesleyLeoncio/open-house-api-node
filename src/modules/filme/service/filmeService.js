import { Filme } from '#filme/models/entity/filme.js';
import { Categoria } from '#categoria/models/entity/categoria.js';
import { FilmeResponse } from "#filme/models/response/filmeResponse.js";


import sequelize from '#config/database-connection.js';

class FilmeService {

    static async findAll(pageable) {
        return await Filme.findAndCountAll({
            include: [
                {
                    model: Categoria,
                    as: 'categorias',
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
                pageable.getPagingData(data.count, data.rows.map(f => new FilmeResponse(f))));
    }

    static async findById(id) {
        return new FilmeResponse(await this.buscarFilme(id));
    }

    static async create(filmeRequest) {
        const transactionBD = await sequelize.transaction();
        const filme = await Filme.create(filmeRequest.getFilme(), {transaction: transactionBD});
        try {
            await Promise.all(filmeRequest.getCategoria().map(categoria => filme.addCategorias(Categoria.build(categoria), {transaction: transactionBD})));
            transactionBD.commit();
        } catch (error) {
            await transactionBD.rollback();
            throw "Ouve um erro em uma das categorias!";
        }

        return await this.findById(filme.id);
    }

    static async update(filmeRequest) {
        const filme = await this.buscarFilme(filmeRequest.id);
        if (filme == null) throw "Filme não encontrado!";
        const transactionBD = await sequelize.transaction();
        Object.assign(filme, filmeRequest.getFilme());
        await filme.save({transaction: transactionBD});
        try {
            await sequelize.models.categoria_filme.destroy({where: {filmeId: filme.id}, transaction: transactionBD});
            await Promise.all(filmeRequest.getCategoria().map(categoria => filme.addCategorias(Categoria.build(categoria), {transaction: transactionBD})));
            transactionBD.commit();
        } catch (error) {
            await transactionBD.rollback();
            throw "Ouve um erro em uma das categorias!";
        }

        return await this.findById(filme.id);
    }

    static async delete(id) {
        const filme = await this.buscarFilme(id);
        if (filme == null)
            throw 'Filme não encontrado!';
        try {
            await filme.destroy();
            return new FilmeResponse(filme);
        } catch (error) {
            throw "Erro ao tentar deletar filme!";
        }
    }

    static async buscarFilme(id) {
        return  await Filme.findByPk(id, {
            include: [
                {
                    model: Categoria,
                    as: 'categorias',
                    attributes: ['id', 'nome'],
                    through: {
                        attributes: [],
                    }
                }
            ]
        });
    }
}


export { FilmeService }