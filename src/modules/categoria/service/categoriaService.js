import { Categoria } from '#categoria/models/categoria.js';

//TODO REFATORAR

class CategoriaService {

    static async findAll() {
        const categorias = await Categoria.findAll();
        return categorias;
    }

    static async findById(req) {
        const {id} = req.params;
        const categoria = await Categoria.findByPk(id);
        return categoria;
    }

    static async create(req) {
        const {nome} = req.body;
        const categoria = await Categoria.create({nome});
        return await Categoria.findByPk(categoria.id);
    }

    static async update(req) {
        const {id} = req.params;
        const {nome} = req.body;
        const categoria = await Categoria.findByPk(id);
        if (categoria == null)
            throw 'Categoria não encontrada!';
        Object.assign(categoria, {nome});
        await categoria.save();
        return await Categoria.findByPk(categoria.id);
    }

    static async delete(req) {
        const {id} = req.params;
        const categoria = await Categoria.findByPk(id);
        if (categoria == null)
            throw 'Categoria não encontrado!';
        try {
            await categoria.destroy();
            return categoria;
        } catch (error) {
            throw "Não é possível remover uma categoria associado a um filme!";
        }
    }
}

export { CategoriaService };