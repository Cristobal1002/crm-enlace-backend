import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/main.database.js';
import DonationModel from "./donation.model.js";
import NoveltyModel from "./novelty.model.js";

class DonationNoveltyModel extends Model{}

DonationNoveltyModel.init({
    donation_id: {
        type: DataTypes.INTEGER,
        references: {
            model: DonationModel,
            key: 'id'
        },
        allowNull: false
    },
    novelty_id: {
        type: DataTypes.INTEGER,
        references: {
            model: NoveltyModel,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'DonationNoveltyModel',
    tableName: 'donation_novelties',
    timestamps: false
})
export default  DonationNoveltyModel;