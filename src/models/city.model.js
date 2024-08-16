import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/main.database.js';
import StateModel from "./state.model.js";

class CityModel extends Model {}

CityModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state_id: {
        type: DataTypes.INTEGER,
        references: {
            model: StateModel,
            key: 'id'
        },
        allowNull: false
    },
    state_code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    state_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    country_code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    country_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true
    },
    wikiDataId: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'CityModel',
    tableName: 'cities',
    paranoid: true,
    timestamps:false
});

export default CityModel;
