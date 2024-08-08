import 'dotenv/config';
import express from 'express';
import { routes } from '../routes/main.routes.js';
import { errorHandlerMiddleware } from '../middleware/main.middleware.js';
import {sequelize} from '../database/main.database.js';
import {syncDb} from "../models/main.model.js";

export default async () => {
    const port = process.env.SERVER_PORT;

    const app = express();
    app.use(express.json({limit: '20mb'}));
    app.use(express.urlencoded({extended: true, limit: '20mb'}));

    //syncDb().then(() => console.log('Tablas sincronizadas'))

    routes(app);
    app.use(errorHandlerMiddleware.errorHandler); //Este va a ser el manejador de errores de la aplicacion

    app.listen(port, () => {
        console.log('server running in port:', port);
    });
};
