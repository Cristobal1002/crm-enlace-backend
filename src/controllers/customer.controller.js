import {responses} from '../network/main.network.js'
import {campaignService, customerService} from '../services/main.service.js'
import {warning} from "../network/response.network.js";

export const createCustomer = async (req, res, next) => {
    try {
        const response = await customerService.createCustomer(req.body)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
        if(response.warning){responses.warning(req, res, response.warning)}
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const getCustomerList = async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1; // Número de la página actual, por defecto 1
    const pageSize = parseInt(req.query.pageSize, 10) || 10; // Tamaño de página, por defecto 10
    console.log('Query:', req.query)
    try{
        const response = await customerService.getCustomerList(page, pageSize, req.query)
        responses.success(req, res, response.data)
    }catch (e) {
        console.log(e)
        next(e)
    }
}

export const updateCustomer = async(req, res, next) => {
    const id = req.params.id
    try {
        const response = await customerService.updateCustomer(id, req.body)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
        if(response.warning){responses.warning(req, res, response.warning)}
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const getCustomerByDocument = async (req, res, next) => {

    let document = req.query.document
    console.log('Document en controller', document)
    try {
        const response = await customerService.getCustomerByDocument(document)
        if(response.data){ responses.success(req, res, response.data)
        } else {
            responses.success(req, res, response.data)
        }
        if(response.warning){responses.warning(req, res, response.warning)}
        if(response.error){responses.error(req, res, response.error)}
    }catch (e) {
        console.log(e)
        next(e)
    }
}
