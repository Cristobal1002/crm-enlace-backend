import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../database/main.database.js';

class ReasonsModel extends Model {}

ReasonsModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    sequelize,
    modelName: 'ReasonsModel',
    tableName: 'reasons',
    paranoid: true,
    timestamps: true
})
export default ReasonsModel