import Sequelize from 'sequelize';
import { databaseConfig } from "#config/database-config.js";
import { Categoria } from '#categoria/models/entiy/categoria.js';
import { Filme } from '#filme/models/entiy/filme.js';

const sequelize = new Sequelize(databaseConfig);


Categoria.init(sequelize);
Filme.init(sequelize);

Categoria.associate(sequelize.models);
Filme.associate(sequelize.models);


databaseCreate();

//TODO DELETAR E REFATORAR
function databaseCreate() {
    (async () => {
        await sequelize.sync({force: true});

        const categoria1 = await Categoria.create({nome: "AÇÃO"});
        const categoria2 = await Categoria.create({nome: "AVENTURA"})

        const filme1 = await Filme.create({
            nome: "FILME 1",
            descricao: "Descricao 1",
            dataLancamento: "2023-12-21",
            duracao: "1h 30",
            imagem: "1.png"
        });
        const filme2 = await Filme.create({
            nome: "FILME 2",
            descricao: "Descricao 2",
            dataLancamento: "2023-12-21",
            duracao: "1h 30",
            imagem: "2.png"
        });

        await filme1.addCategorias(categoria1, {through: 'filme_categoria'});
        await filme1.addCategorias(categoria2, {through: 'filme_categoria'});

        await filme2.addCategorias(categoria1, {through: 'filme_categoria'});


    })();
}

export default sequelize;
