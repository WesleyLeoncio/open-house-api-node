import { Model, DataTypes } from 'sequelize';


export class Avaliacao extends Model {

    static init(sequelize) {
        super.init({
            nota: {
                type: DataTypes.NUMBER,
                validate: {
                    notEmpty: {msg: "Nota da avaliação deve ser preenchido!"},
                    isInt: true,
                    max: 5,
                    min: 1
                }
            }
        }, {sequelize, modelName: 'avaliacao', tableName: 'avaliacoes'})
    }

    static associate(models) {
        this.removeAttribute('id');
        this.belongsTo(models.usuario, {as: 'usuario', foreignKey: {name: 'usuarioId', primaryKey: true, allowNull: false, validate: {notNull: {msg: 'Usuario da avaliação deve ser preenchido!'} }}});
        this.belongsTo(models.filme, {as: 'filme', foreignKey: {name: 'filmeId', primaryKey: true, allowNull: false, validate: {notNull: {msg: 'Filme da avaliacao deve ser preenchida!'}}}});
    }

}