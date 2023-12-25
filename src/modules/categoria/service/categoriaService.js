import { Categoria } from '#categoria/models/entiy/categoria.js';
import { CategoriaResponse } from "#categoria/models/response/categoriaResponse.js";
import { Pageable } from "#utils/pageable.js";

//TODO REFATORAR E TALVES COLOCAR COLOCAR UM AWAIT NO ID

// const getPagination = (page, size) => {
//     const limit = size ? +size : 3;
//     const offset = page ? page * limit : 0;
//
//     return { limit, offset };
// };
//
// const getPagingData = (data, page, limit) => {
//     const { count: totalElements, rows: itens } = data;
//     const currentPage = page ? +page : 0;
//     const totalPages = Math.ceil(totalElements / limit);
//     const content = itens.map(categoria => new CategoriaResponse(categoria));
//     return { totalElements, content, totalPages, currentPage };
// };

class CategoriaService {

    // static async findAll() {
    //     return (await Categoria.findAll()).map(categoria => new CategoriaResponse(categoria));
    // }

    static async findAll(req) {
        // const {page, size, filter} = req.query;
        //let condition = title ? {title: {[Op.like]: `%${title}%`}} : null;
        const pageable = new Pageable(req.query);

        return await Categoria.findAndCountAll({limit: pageable.limit, offset: pageable.offset})
            .then(data =>
                pageable.getPagingData(data.count, data.rows.map(d => new CategoriaResponse(d))));
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

export { CategoriaService };