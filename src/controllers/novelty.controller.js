import {responses} from '../network/main.network.js'
import {noveltyService, reasonService} from "../services/main.service.js";

export const createNovelty = async (req, res, next) => {
    try {
        const response = await noveltyService.createNovelty(req.body)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const updateNovelty = async (req, res, next) => {
    const id = req.params.id
    try {
        const response = await noveltyService.updateNovelty(id, req.body)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    }catch (e) {
        console.log(e)
        next(e)
    }
}

export const getNoveltyList = async(req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1; // Número de la página actual, por defecto 1
    const pageSize = parseInt(req.query.pageSize, 10) || 10; // Tamaño de página, por defecto 10
    try {
        const response = await noveltyService.getNoveltyList(page, pageSize, req.query)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const getActiveNoveltyList = async(req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1; // Número de la página actual, por defecto 1
    const pageSize = parseInt(req.query.pageSize, 10) || 10; // Tamaño de página, por defecto 10
    try {
        const response = await noveltyService.getActiveNovelties()
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    } catch (e) {
        console.log(e)
        next(e)
    }
}