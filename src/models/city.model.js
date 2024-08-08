import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/main.database.js';
import DepartmentModel from "./department.model.js";

class CityModel extends Model {}

CityModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Código estándar para la ciudad
    },
    department_id: {
        type: DataTypes.INTEGER,
        references: {
            model: DepartmentModel,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'CityModel',
    tableName: 'cities',
    timestamps: true,
    paranoid: true
});

export default CityModel;
