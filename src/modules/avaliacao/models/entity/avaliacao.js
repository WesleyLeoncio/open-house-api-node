import { Model, DataTypes } from 'sequelize';

export class Avaliacao extends Model {

    static init(sequelize) {
        super.init({
            nota: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: {msg: "Nota da avaliação deve ser preenchido!"},
                    isInt: true,
                    max: {args: 5, msg: "A nota maxima é 5"},
                    min: {args: 1, msg: "A nota minima é 1"},
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