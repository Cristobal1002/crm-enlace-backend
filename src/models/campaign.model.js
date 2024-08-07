import { Model, DataTypes} from 'sequelize';
import { sequelize } from '../database/main.database.js';
import UserModel from "./user.model.js";

class CampaignModel extends Model{}

CampaignModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    goal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rhema: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phrase: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
    modelName: 'CampaignModel',
    tableName: 'podium',
    paranoid: true,
    timestamps: true
})

export default CampaignModel;