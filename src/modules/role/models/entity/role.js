import { Model, DataTypes } from 'sequelize';

class Role extends Model {

    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    notEmpty: {msg: "Nome da Role deve ser preenchido!"},
                    len: {args: [2, 20], msg: "Nome da Role deve ter entre 2 e 20 letras!"}
                }
            },
        }, {sequelize, modelName: 'role', tableName: 'roles'})
    }

    static associate(models) {
        this.belongsToMany(models.usuario, {
            as: 'usuarios',
            through: 'profile',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    }

}

export { Role };