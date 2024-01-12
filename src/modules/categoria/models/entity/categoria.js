import { Model, DataTypes } from 'sequelize';

class Categoria extends Model {

    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Campo nome não pode ser null!'},
                    notEmpty: {msg: "Nome da Categoria deve ser preenchido!"},
                    len: {args: [2, 50], msg: "Nome da Categoria deve ter entre 2 e 50 letras!"}
                }
            },
        }, {sequelize, modelName: 'categoria', tableName: 'categorias'})
    }

    static associate(models) {
        this.belongsToMany(models.filme, {
            as: 'filmes',
            through: 'categoria_filme',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    }
}

export { Categoria };