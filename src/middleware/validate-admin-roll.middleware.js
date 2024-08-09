import { responses } from '../network/main.network.js';

export const isAdmin = (req, res, next) => {
    const {roll, name} = req.auth
    if(!req.auth) responses.error(req,res)
    roll === 'admin' ? next() : responses.unauthorized(req, res);
}