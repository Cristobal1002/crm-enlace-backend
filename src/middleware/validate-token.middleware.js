import { jwt } from '../utils/main.util.js';
import { responses } from '../network/main.network.js';
import {model} from "../models/main.model.js";
import {CustomError} from "../errors/main.error.js";

export const checkToken = async (req, res, next) => {
    try {
        const token = req.header('x-app-token');

        // Verifica si el token existe
        if (!token) {
            return responses.unauthorized(req, res, 'Token no proporcionado');
        }

        // Verifica la validez del token
        const isValid = jwt.verifyToken(token);
        if (!isValid) {
            return responses.unauthorized(req, res, 'Token inválido');
        }

        // Obtén la información del usuario desde el token
        const getInfo = jwt.getData(token);
        const usrInfo = await model.UserModel.findByPk(getInfo.user);

        // Verifica si el usuario existe y si su estado es activo
        if (!usrInfo || usrInfo.dataValues.status !== true) {
            return responses.unauthorized(req, res, 'Usuario no autorizado o inactivo');
        }

        // Adjunta la información del usuario y el token al request
        req.auth = usrInfo.dataValues;
        req.valid = true;
        req.token = token;

        // Si todo está bien, continúa con la siguiente función de middleware
        next();

    } catch (e) {
        console.log('Error al verificar el token:', e);

        // Responde con un error 500 si ocurre alguna excepción inesperada
        return res.status(500).json({
            message: 'Error interno del servidor',
            code: 500,
            error: e.message
        });
    }
};
