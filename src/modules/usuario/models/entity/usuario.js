import { DataTypes, Model } from "sequelize";

export class Usuario extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {msg: "Nome do usuario deve ser preenchido!"},
                }
            },
            login: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    notEmpty: {msg: "A descrição do filme deve ser preenchido!"},
                    isEmail: {msg: "O email deve seguir o formato email@domino.com"}
                }
            },
            senha: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {msg: "A senha deve ser preenchido!"},
                }
            },
            status: {
                type: DataTypes.BOOLEAN,
                validate: {
                    notEmpty: {msg: "O status do usuarios não pode ser null!"}
                }
            }
        }, {sequelize, modelName: 'usuario', tableName: 'usuarios'})
    }

    static associate(models) {
        this.belongsToMany(models.role, {
            as: 'roles',
            through: 'profile',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
        this.hasMany(models.avaliacao, { as: { singular:'avaliacao' , plural: 'avaliacoes'}, onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    }
}
