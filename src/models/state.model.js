import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/main.database.js';
import CountryModel from "./country.model.js";

class StateModel extends Model {}

StateModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country_id: {
        type: DataTypes.INTEGER,
        references: {
            model: CountryModel,
            key: 'id'
        },
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
    state_code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
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
    }
}, {
    sequelize,
    modelName: 'StateModel',
    tableName: 'states',
    paranoid: true,
    timestamps: false
});

export default StateModel;
