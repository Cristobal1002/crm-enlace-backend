import { jwt } from '../utils/main.util.js';
import { responses } from '../network/main.network.js';

export const checkToken = (req, res, next) => {
    const token = req.header('x-app-token');
    const isValid = jwt.verifyToken(token);
    isValid ? next() : responses.unauthorized(req, res);
};