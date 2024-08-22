import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../database/main.database.js';
import UserModel from "./user.model.js";
import CountryModel from "./country.model.js";
import StateModel from "./state.model.js";
import CityModel from "./city.model.js";

class CustomerModel extends Model {}

CustomerModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    document: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    document_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type:DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('masculino', 'femenino'),
        allowNull: true
    },
    country_id: {
        type: DataTypes.INTEGER,
        references: {
            model: CountryModel,
            key: 'id'
        },
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
    city_id: {
        type: DataTypes.INTEGER,
        references: {
            model: CityModel,
            key: 'id'
        },
        allowNull: false
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        references: {
            model:UserModel,
            key:'id'
        }
    },
    updated_by: {
        type: DataTypes.INTEGER,
        references: {
            model:UserModel,
            key:'id'
        }
    }
},{
    sequelize,
    modelName: 'CustomerModel',
    tableName: 'customer',
    paranoid: true,
    timestamps: true
})

export default CustomerModel;