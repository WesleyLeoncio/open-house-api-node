import { Categoria } from '#categoria/models/entity/categoria.js';
import { CategoriaResponse } from "#categoria/models/response/categoriaResponse.js";


export class CategoriaService {

    static async findAll(pageable) {
        return await Categoria.findAndCountAll({
            where: pageable.getFilter('nome'),
            limit: pageable.limit,
            offset: pageable.offset
        })
            .then(data =>
                pageable.getPagingData(data.count, data.rows.map(c => new CategoriaResponse(c))));
    }

    static async findById(id) {
        const categoria = await Categoria.findByPk(id);
        return new CategoriaResponse(categoria);
    }

    static async create(categoriaRequest) {
        const categoria = await Categoria.create(categoriaRequest);
        return await this.findById(categoria.id);
    }

    static async update(categoriaRequest) {
        const categoria = await Categoria.findByPk(categoriaRequest.id);
        if (categoria == null)
            throw 'Categoria não encontrada!';
        Object.assign(categoria, categoriaRequest);
        await categoria.save();
        return await this.findById(categoria.id);
    }

    static async delete(id) {
        const categoria = await Categoria.findByPk(id);
        if (categoria == null)
            throw 'Categoria não encontrado!';
        try {
            await categoria.destroy();
            return new CategoriaResponse(categoria);
        } catch (error) {
            throw "Não é possível remover uma categoria associado a um filme!";
        }
    }
}

