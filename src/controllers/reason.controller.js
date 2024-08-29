import {responses} from '../network/main.network.js'
import {bankService, reasonService} from "../services/main.service.js";

export const createReason = async (req, res, next) => {
    try {
        const response = await reasonService.createReason(req.body)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const updateReason = async (req, res, next) => {
    const id = req.params.id
    try {
        const response = await reasonService.updateReason(id, req.body)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    }catch (e) {
        console.log(e)
        next(e)
    }
}

export const getReasonList = async(req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1; // Número de la página actual, por defecto 1
    const pageSize = parseInt(req.query.pageSize, 10) || 10; // Tamaño de página, por defecto 10

    try {
        const response = await reasonService.getReasonList(page, pageSize, req.query)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const getActiveReasonsList = async (req, res, next) => {
    try {
        const response = await reasonService.getActiveReasons()
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    }catch (e) {
        console.log(e)
        next(e)
    }
}