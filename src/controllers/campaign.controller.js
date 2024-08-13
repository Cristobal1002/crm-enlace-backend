import { responses } from '../network/main.network.js'
import {campaignService, userService} from "../services/main.service.js";

export const createCampaign = async (req, res, next) => {
    try{
        const response = await campaignService.createCampaign(req.body);
        responses.success(req, res, response.data)
    }catch (e) {
        console.log(e)
        next(e)
    }
}

export const getActive = async (req, res, next) => {
    try {
        const response = await campaignService.getActiveCampaign()
        responses.success(req, res, response.data)
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const getCampaignList = async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1; // Número de la página actual, por defecto 1
    const pageSize = parseInt(req.query.pageSize, 10) || 10; // Tamaño de página, por defecto 10
    try{
        const response = await campaignService.getCampaignList(page, pageSize, req.query)
        responses.success(req, res, response.data)
    }catch (e) {
        console.log(e)
        next(e)
    }
}

export const inactivateCurrent = async (req, res, next) => {
    try {
        const response = await campaignService.inactivateCurrent(req.body)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const updateCampaign = async (req, res, next) => {
    const id = req.params.id
    try {
        const response = await campaignService.updateCampaign(id, req.body)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    }catch (e) {
        console.log(e)
        next(e)
    }
}

export const activateCampaign = async (req, res, next) => {
    try{
        const response = await campaignService.activateCampaign(req.body)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    }catch (e) {
        console.log(e)
        next(e)
    }
}