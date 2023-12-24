import { Model, DataTypes } from 'sequelize';

class Categoria extends Model {

    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {msg: "Nome da Categoria deve ser preenchido!"},
                    len: {args: [2, 50], msg: "Nome da Categoria deve ter entre 2 e 50 letras!"}
                }
            },
        }, {sequelize, modelName: 'categoria', tableName: 'categorias'})
    }

    static associate(models) {
        this.belongsToMany(models.filme, {
            as: 'filmes',
            through: 'filme_categoria',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    }
}

export { Categoria };