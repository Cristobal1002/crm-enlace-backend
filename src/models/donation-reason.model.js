import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/main.database.js';
import DonationModel from "./donation.model.js";
import ReasonsModel from "./reasons.model.js";

class DonationReasonModel extends Model {}

DonationReasonModel.init({
    donation_id: {
        type: DataTypes.INTEGER,
        references: {
            model: DonationModel,
            key: 'id'
        },
        allowNull: false
    },
    reason_id: {
        type: DataTypes.INTEGER,
        references: {
            model: ReasonsModel,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'DonationReasonModel',
    tableName: 'donation_reasons',
    timestamps: false
})
export default DonationReasonModel