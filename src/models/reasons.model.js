import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../database/main.database.js';
import UserModel from "./user.model.js";

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
    },
    created_by: {
        type: DataTypes.INTEGER,
        references: {
            model:UserModel,
            key:'id'
        }
    },
    updated_by: {
        type: DataTypes.INTEGER,
        references: {
            model:UserModel,
            key:'id'
        }
    }
},{
    sequelize,
    modelName: 'ReasonsModel',
    tableName: 'reasons',
    paranoid: true,
    timestamps: true
})
export default ReasonsModel