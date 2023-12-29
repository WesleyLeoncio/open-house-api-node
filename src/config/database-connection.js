import Sequelize from 'sequelize';
import { databaseConfig } from "#config/database-config.js";
import { Categoria } from '#categoria/models/entity/categoria.js';
import { Filme } from '#filme/models/entity/filme.js';
import { Role } from "#role/models/entity/role.js";
import { Usuario } from "#usuario/models/entity/usuario.js";
import { Avaliacao} from "#avaliacao/models/entity/avaliacao.js"

const sequelize = new Sequelize(databaseConfig);


Categoria.init(sequelize);
Filme.init(sequelize);
Role.init(sequelize);
Usuario.init(sequelize)
Avaliacao.init(sequelize)

Categoria.associate(sequelize.models);
Filme.associate(sequelize.models);
Role.associate(sequelize.models);
Usuario.associate(sequelize.models);
Avaliacao.associate(sequelize.models);


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

        const role1 = await Role.create({nome: 'ROLE_MASTER'});
        const role2 = await Role.create({nome: 'ROLE_ADMIN'});
        const role3 = await Role.create({nome: 'ROLE_USER'});

        const usuario1 = await Usuario.create({nome:'User 1', login:'teste@email.com', senha:'123456', status:true});

        usuario1.addRoles(role1, {through: 'profile'});

        usuario1.addRoles(role2, {through: 'profile'});

        const avaliacao1 = await Avaliacao.create({usuarioId: 1, filmeId: 1, nota: 5});
        const avaliacao2 = await Avaliacao.create({usuarioId: 1, filmeId: 2, nota: 3});

    })();
}

export default sequelize;
