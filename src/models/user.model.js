import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../database/main.database.js';

class UserModel extends Model {}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    document: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    roll: {
        type: DataTypes.ENUM('admin', 'basic'),
        allowNull:false
    }
},{
    sequelize,
    modelName: 'UserModel',
    tableName: 'user',
    paranoid: true,
    timestamps: true
})

export default UserModel;