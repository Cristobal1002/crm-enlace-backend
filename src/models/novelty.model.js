import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../database/main.database.js';
import UserModel from "./user.model.js";

class NoveltyModel extends Model {}

NoveltyModel.init({
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
        allowNull: false
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
    modelName: 'NoveltyModel',
    tableName: 'novelty',
    paranoid: true,
    timestamps: true
})
export default NoveltyModel;