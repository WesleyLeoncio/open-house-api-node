import { Categoria } from '#categoria/models/entity/categoria.js';
import { CategoriaResponse } from "#categoria/models/response/categoriaResponse.js";
import { Pageable } from "#utils/pageable.js";

//TODO REFATORAR E TALVES COLOCAR COLOCAR UM AWAIT NO ID


export class CategoriaService {

    static async findAll(req) {
        const pageable = new Pageable(req.query);

        return await Categoria.findAndCountAll({
            where: pageable.getFilter('nome'),
            limit: pageable.limit,
            offset: pageable.offset
        })
            .then(data =>
                pageable.getPagingData(data.count, data.rows.map(c => new CategoriaResponse(c))));
    }

    static async findById(req) {
        const {id} = req.params;
        const categoria = await Categoria.findByPk(id);
        return new CategoriaResponse(categoria);
    }

    static async create(req) {
        const {nome} = req.body;
        const categoria = await Categoria.create({nome});
        return new CategoriaResponse(await Categoria.findByPk(categoria.id));
    }

    static async update(req) {
        const {id} = req.params;
        const {nome} = req.body;
        const categoria = await Categoria.findByPk(id);
        if (categoria == null)
            throw 'Categoria não encontrada!';
        Object.assign(categoria, {nome});
        await categoria.save();
        return new CategoriaResponse(await Categoria.findByPk(categoria.id));
    }

    static async delete(req) {
        const {id} = req.params;
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

