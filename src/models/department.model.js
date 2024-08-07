import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/main.database.js';
import CountryModel from "./country.model.js";

class DepartmentModel extends Model {}

DepartmentModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Código estándar para el departamento (por ejemplo, ISO 3166-2)
    },
    country_id: {
        type: DataTypes.INTEGER,
        references: {
            model: CountryModel,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'DepartmentModel',
    tableName: 'departments',
    timestamps: true,
    paranoid: true
});

export default DepartmentModel;
