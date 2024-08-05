import { Sequelize } from 'sequelize';
import { database } from '../config/secrets.js';

let dbConfig = {
    database: database.name,
    host: database.host,
    password: database.password,
    port: 5432,
    user: database.username,
    pool: {
        acquire: Number(process.env.PG_POOL_ACQUIRE) || 60000,
        idle: Number(process.env.PG_POOL_IDLE) || 10000,
        max: Number(process.env.PG_POOL_MAX) || 400,
        min: Number(process.env.PG_POOL_MIN) || 0
    },
    dialect: 'postgres'
};

const instance = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
export const sequelize = instance;
