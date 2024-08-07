import { Model, DataTypes} from 'sequelize';
import { sequelize } from '../database/main.database.js';

class PodiumModel extends Model{}

PodiumModel.init({
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
    }
},{
    sequelize,
    modelName: 'PodiumModel',
    tableName: 'podium',
    paranoid: true,
    timestamps: true
})

export default PodiumModel;