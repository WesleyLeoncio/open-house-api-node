import { Sequelize } from 'sequelize';
import { databaseConfig } from "#config/database-config.js";
import { Categoria } from '#categoria/models/entity/categoria.js';
import { Filme } from '#filme/models/entity/filme.js';
import { Role } from "#role/models/entity/role.js";
import { Usuario } from "#usuario/models/entity/usuario.js";
import { Avaliacao} from "#avaliacao/models/entity/avaliacao.js"
import { Bcrypt} from "#security/bcrypt.js";

const sequelize = new Sequelize(databaseConfig);


Categoria.init(sequelize);
Filme.init(sequelize);
Role.init(sequelize);
Usuario.init(sequelize);
Avaliacao.init(sequelize);

Categoria.associate(sequelize.models);
Filme.associate(sequelize.models);
Role.associate(sequelize.models);
Usuario.associate(sequelize.models);
Avaliacao.associate(sequelize.models);


databaseCreate();

//TODO CRIAÇÃO DE TABELAS E DADOS DE TESTE
function databaseCreate() {
    (async () => {
        await sequelize.sync({force: true});

        const categoria1 = await Categoria.create({nome: "AÇÃO"});
        const categoria2 = await Categoria.create({nome: "AVENTURA"})

        const filme1 = await Filme.create({
            nome: "Benjamin Button",
            descricao: "Conta a história de Benjamin Button, um homem que envelhece de trás para frente, com consequências surpreendentes.",
            dataLancamento: "2008-12-10",
            duracao: "2 h 46 min",
            imagem: "benjamin-button/1.jpg"
        });
        const filme2 = await Filme.create({
            nome: "Black Swan",
            descricao: "Uma esforçada bailarina luta para manter sua sanidade após obter o papel principal no Lago dos Cisnes de Tchaikovsky.",
            dataLancamento: "2010-09-01",
            duracao: "1 h 48 min",
            imagem: "cisne-negro/1.jpg"
        });

        await filme1.addCategorias(categoria1, {through: 'filme_categoria'});
        await filme1.addCategorias(categoria2, {through: 'filme_categoria'});

        await filme2.addCategorias(categoria1, {through: 'filme_categoria'});

        const role1 = await Role.create({nome: 'ROLE_MASTER'});
        const role2 = await Role.create({nome: 'ROLE_ADMIN'});
        const role3 = await Role.create({nome: 'ROLE_USER'});

        const senhaHash = await Bcrypt.passwordHash('123456');

        const usuario1 = await Usuario.create({nome:'User 1', login:'teste@email.com', senha:senhaHash, status:true});

        usuario1.addRoles(role1, {through: 'profile'});

        usuario1.addRoles(role2, {through: 'profile'});

        usuario1.addRoles(role3, {through: 'profile'});

        await Avaliacao.create({usuarioId: 1, filmeId: 1, nota: 5});
        await Avaliacao.create({usuarioId: 1, filmeId: 2, nota: 3});

    })();
}

export default sequelize;
