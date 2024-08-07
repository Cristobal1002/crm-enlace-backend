import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../database/main.database.js';
import BankModel from "./bank.model.js";
import CustomerModel from "./customer.model.js";
import CampaignModel from "./campaign.model.js";
import UserModel from "./user.model.js";

class DonationModel extends Model{}

DonationModel.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    campaign_id:{
        type: DataTypes.INTEGER,
        references: {
            model: CampaignModel,
            key: 'id'
        }
    },
    petition : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    testimony: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    account_id:{
        type: DataTypes.INTEGER,
        references: {
            model: BankModel,
            key: "id"
        }
    },
    customer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: CustomerModel,
            key: "id"
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: "id"
        }
    },
    quotes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'DonationModel',
    tableName: 'donation',
    paranoid: true,
    timestamps: true
})
export default DonationModel;