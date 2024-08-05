import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../database/main.database.js';

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
        allowNull: false
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
        type: DataTypes.DATE
    }
})

export default CustomerModel;