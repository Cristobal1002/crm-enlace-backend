import {model} from "../models/main.model.js";
import bcrypt from 'bcryptjs';
import {CustomError} from "../errors/main.error.js";
import {jwt} from "../utils/main.util.js";

export const login = async (data) => {
    const { user, password } = data;

    if (!user || !password) {
        return { warning: 'Invalid credentials', error: null };
    }

    try {
        const normalizedUser = user.trim().toLowerCase();

        // Buscar el usuario por documento
        const usr = await model.UserModel.findOne({ where: { document: normalizedUser } });

        // Verificar si el usuario existe
        if (!usr) {
            return { warning: 'Usuario o contraseña no validos', error: null };
        }

        // Verificar si el usuario está activo
        if (!usr.status) {
            return { warning: 'Tu cuenta está inactiva, por favor contacta a soporte.', error: null };
        }

        // Verificar la validez de la contraseña
        const isPasswordValid = await bcrypt.compare(password, usr.password);
        if (!isPasswordValid) {
            return { warning: 'Usuario o contraseña no validos', error: null };
        }

        // Generar token si todo es válido
        const token = await jwt.getToken(usr);

        // Filtrar datos sensibles
        const { id, name, document, roll, status, createdAt, updatedAt } = usr;
        const userResponse = { id, name, document, roll, status, createdAt, updatedAt };

        return {
            data: { user: userResponse, token },
            error: null,
            warning: null
        };
    } catch (error) {
        console.error('Error in login:', error.parent.code);

        if (error.parent.code === '22P02') { // Manejo específico de errores de tipo
            throw new CustomError({ message: 'Invalid input format', code: 400, data: error.data });

        }

        throw new CustomError({ message: 'Internal server error', code: 500, data: error.data });
    }
};
