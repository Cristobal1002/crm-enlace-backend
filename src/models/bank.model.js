import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../database/main.database.js';

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
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    sequelize,
    modelName: 'BankModel',
    tableName: 'bank',
    paranoid: true,
    timestamps: true
})
export default BankModel;