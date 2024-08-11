import Jwt from 'jsonwebtoken';
import { config } from '../config/secrets.js';

const secret = config.jwt;

// Crear el token
export const getToken = (user) => {
    const { id, name, roll } = user
    return new Promise((resolve, reject) => {
        const payload = { app: 'api-backend', user: id, name, role: roll, expire: new Date() };
        Jwt.sign(payload, secret, { expiresIn: '6h' }, (error, token) => {
            if (error) {
                reject(new Error('Impossible to get token'));
            } else {
                resolve(token);
            }
        });
    });
};

// Verificar el token
export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        Jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};

// Obtener datos del token
export const getData = (token) => {
    try {
        const data = Jwt.verify(token, secret, (err, decoded) => decoded);
        data.valid = true;
        data.expUTC = new Date(data.exp * 1000);
        data.expLOCAL = data.expUTC.toLocaleString('es-ES', { hour12: true });
        data.token = token;

        return data;
    } catch (error) {
        return {
            valid: false,
        };
    }
};

