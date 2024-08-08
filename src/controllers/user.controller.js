import { responses } from '../network/main.network.js'
import {userService} from "../services/main.service.js";


export const register = async (req, res, next) =>{
    const data = req.body;
    console.log('Data en controlador==>', data)
    try {
        const response = await userService.createUser(data)
        responses.success(req, res, response.data)
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const updateUser = async (req, res, next) => {
    const id = req.params.id
    console.log('param', id)
    try {
        const response = await userService.updateUser(id, req.body)
        responses.success(req, res, response.data)
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const getUsers = async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1; // Número de la página actual, por defecto 1
    const pageSize = parseInt(req.query.pageSize, 10) || 10; // Tamaño de página, por defecto 10
    try{
        const response = await userService.getUsersList(page, pageSize, req.query)
        responses.success(req, res, response.data)
    }catch (e) {
        console.log(e)
        next(e)
    }
}