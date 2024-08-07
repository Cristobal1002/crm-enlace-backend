import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../database/main.database.js';

class NoveltyModel extends Model {}

NoveltyModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'NoveltyModel',
    tableName: 'novelty',
    paranoid: true,
    timestamps: true
})
export default NoveltyModel;