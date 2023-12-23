import {Filme} from '#filme/models/filme.js';
import {Categoria} from '#categoria/models/categoria.js';

import sequelize from '#config/database-connection.js';

class FilmeService {

    static async findAll() {
        const filmes = await Filme.findAll({include: {all: true, nested: true}});
        return filmes;
    }

    static async findById(req) {
        const {id} = req.params;
        const filme = await Filme.findByPk(id, {include: {all: true, nested: true}});
        return filme;
    }


    static async create(req) {
        const {nome, descricao, dataLancamento, duracao, imagem, categorias} = req.body;
        const transactionBD = await sequelize.transaction();
        const filme = await Filme.create({
            nome,
            descricao,
            dataLancamento,
            duracao,
            imagem
        }, {transaction: transactionBD});
        try {
            await Promise.all(categorias.map(categoria => filme.addCategorias(Categoria.build(categoria), {transaction: transactionBD})));
            transactionBD.commit();
        } catch (error) {
            await transactionBD.rollback();
            throw "Ouve um erro em uma das categorias!";
        }

        return await Filme.findByPk(filme.id, {include: {all: true, nested: true}});
    }

    static async update(req) {
        const {id} = req.params;
        const {nome, descricao, dataLancamento, duracao, imagem, categorias} = req.body;
        const filme = await Filme.findByPk(id, {include: {all: true, nested: true}});
        if (filme == null) throw "Filme não encontrado!";
        const transactionBD = await sequelize.transaction();
        Object.assign(filme, {nome, descricao, dataLancamento, duracao, imagem});
        await filme.save({transaction: transactionBD});
        try {
            await sequelize.models.filme_categoria.destroy({where: {filmeId: filme.id}, transaction: transactionBD});
            await Promise.all(categorias.map(categoria => filme.addCategorias(Categoria.build(categoria), {transaction: transactionBD})));
            transactionBD.commit();
        } catch (error) {
            await transactionBD.rollback();
            throw "Ouve um erro em uma das categorias!";
        }

        return await Filme.findByPk(filme.id, {include: {all: true, nested: true}});
    }

    static async delete(req) {
        const {id} = req.params;
        const filme = await Filme.findByPk(id);
        if (filme == null)
            throw 'Filme não encontrado!';
        try {
            await filme.destroy();
            return filme;
        } catch (error) {
            throw "Erro ao tentar deletar filme!";
        }
    }
}

export {FilmeService}