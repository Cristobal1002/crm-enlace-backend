import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/main.database.js';

class CountryModel extends Model {}

CountryModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Código ISO 3166-1 alpha-2
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    flag: {
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize,
    modelName: 'CountryModel',
    tableName: 'countries',
    timestamps: true,
    paranoid: true
});

export default CountryModel;
