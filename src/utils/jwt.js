import Jwt from 'jsonwebtoken'
import { config } from '../config/secrets.js'

const secret = config.jwt

export const getToken = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { app: 'api-backend', user: id, expire: new Date() }
        Jwt.sign(payload, secret, { expiresIn: '6h' },
            (error, token) => {
                if (error) { reject('Imposibble to get token') } else {
                    resolve(token)
                }
            })
    })
}

export const  verifyToken = (token) => {
    try {
        return Jwt.verify(token, secret, (err, decoded) => !err);
    } catch (error) {
        return false;
    }
};

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