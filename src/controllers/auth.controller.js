import { responses } from '../network/main.network.js'
import {authService} from "../services/main.service.js";

export const login = async (req, res, next) => {
    try {
        const response = await authService.login(req.body);

        if (response.data) {
            return responses.success(req, res, response.data);
        }
        if (response.warning === 'Tu cuenta esta inactiva, por favor contacta a soporte.') {
            return responses.warning(req, res, response.warning);
        }
        if (response.warning ) {
            return responses.unauthorized(req, res, response.warning);
        }

        if (response.error) {
            return responses.error(req, res, response.error);
        }
    } catch (e) {
        console.log('Login error:', e);
        next(e);
    }
};

export const test = async (req, res, next) => {
    const data = req.body
    try {
        res.send(data)
    } catch (e) {
        next(e)
    }
}

export const validate = async (req, res, next) => {
    try{
        console.log(req)
        if(req.valid){responses.success(req, res, {valid:req.valid, token: req.token})}
    } catch (e) {
        next(e)
    }
}