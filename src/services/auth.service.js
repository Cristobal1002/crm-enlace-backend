import {model} from "../models/main.model.js";
import bcrypt from 'bcryptjs';
import {CustomError} from "../errors/main.error.js";
import {jwt} from "../utils/main.util.js";

export const login = async (data) => {
    const { user, password } = data;

    if (!user || !password) {
    }

    try {
        const normalizedUser = user.trim().toLowerCase();

        const usr = await model.UserModel.findOne({ where: { document: normalizedUser } });
        if (!usr) {
            return { error: 'Invalid credentials', warning: null };
        }

        const isPasswordValid = await bcrypt.compare(password, usr.password);
        if (!isPasswordValid) {
            return { error: 'Invalid credentials', warning: null };
        }

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
        console.error('Error in login:', error);
        throw new CustomError({ message: 'Internal server error', code: 500, data: error.data });
    }
};