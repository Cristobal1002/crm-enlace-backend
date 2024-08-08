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
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'CountryModel',
    tableName: 'countries',
    timestamps: true,
    paranoid: true
});

export default CountryModel;
