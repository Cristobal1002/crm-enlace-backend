import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../database/main.database.js';
import UserModel from "./user.model.js";

class BankModel extends Model{}

BankModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    account_number :{
        type: DataTypes.STRING,
        allowNull: false
    },
    additional_data: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pay_link:{
        type: DataTypes.STRING,
        allowNull: true
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
    modelName: 'BankModel',
    tableName: 'bank',
    paranoid: true,
    timestamps: true
})
export default BankModel;