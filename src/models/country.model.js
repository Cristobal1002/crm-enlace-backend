import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/main.database.js';

class CountryModel extends Model {}

CountryModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    iso3: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    iso2: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    numeric_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: true
    },
    emoji: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'CountryModel',
    tableName: 'countries',
    paranoid: true,
    timestamps: false
});

export default CountryModel;
