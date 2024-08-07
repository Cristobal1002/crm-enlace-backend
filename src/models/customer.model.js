import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../database/main.database.js';
import UserModel from "./user.model.js";

class CustomerModel extends Model {}

CustomerModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    document: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    phone: {
        type:DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('masculino', 'femenino'),
        allowNull: false
    },
    country:{
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city:{
        type: DataTypes.STRING,
        allowNull: false
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING,
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
    modelName: 'CustomerModel',
    tableName: 'customer',
    paranoid: true,
    timestamps: true
})

export default CustomerModel;