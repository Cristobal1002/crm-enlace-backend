import { jwt } from '../utils/main.util.js';
import { responses } from '../network/main.network.js';
import {model} from "../models/main.model.js";
import {CustomError} from "../errors/main.error.js";

export const checkToken = async (req, res, next) => {
    try{
        const token = req.header('x-app-token');
        const isValid = jwt.verifyToken(token);
        const getInfo = jwt.getData(token)
        const usrInfo = await model.UserModel.findByPk(getInfo.user)
        req.auth = usrInfo.dataValues
        isValid && usrInfo.dataValues.status === true ? next() : responses.unauthorized(req, res);
    } catch (e){
        console.log('error',e)
        throw CustomError({message:'error', code: 500, data:e.data})
    }
};