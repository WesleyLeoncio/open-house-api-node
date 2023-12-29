import { Model, DataTypes } from 'sequelize';

//TODO ADICIONAR VALIDATE
class Avaliacao extends Model {

    static init(sequelize) {
        super.init({
            nota: {
                type: DataTypes.NUMBER,
                validate: {
                    notEmpty: {msg: "Nota da avaliação deve ser preenchido!"},
                }
            }
        }, {sequelize, modelName: 'reserva', tableName: 'reservas'})
    }

    static associate(models) {
        // this.belongsTo(models.cliente, { as: 'cliente', foreignKey: {name: 'clienteId', allowNull: false, validate: {notNull: {msg: 'Cliente da Reserva deve ser preenchido!'}}}});
        // this.belongsTo(models.fita, { as: 'fita', foreignKey: {name: 'fitaId', allowNull: false, validate: {notNull: {msg: 'Fita da Reserva deve ser preenchida!'}}}});
    }

}