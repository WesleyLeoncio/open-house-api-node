import { Model, DataTypes } from 'sequelize';

class Filme extends Model {

    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Campo nome não pode ser null!'},
                    notEmpty: {msg: "Nome do filme deve ser preenchido!"},
                }
            },
            descricao: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Campo de descrição não pode ser null!'},
                    notEmpty: {msg: "A descrição do filme deve ser preenchido!"},
                }
            },
            dataLancamento: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Campo de data não pode ser null!'},
                    isDate: {msg: "Data do filme deve ser preenchido no formato yyyy-MM-dd!"}
                }
            },
            duracao: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Campo de duração não pode ser null!'},
                    notEmpty: {msg: "A Duração do filme deve ser preenchido!"},
                }
            },
            imagem: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Campo imagem não pode ser null!'},
                    notEmpty: {msg: "O nome da imagem do filme deve ser preenchido!"},
                }
            }
        }, {sequelize, modelName: 'filme', tableName: 'filmes'})
    }

    static associate(models) {
        this.belongsToMany(models.categoria, {
            as: 'categorias',
            through: 'filme_categoria',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }
}

export { Filme };