import {responses} from '../network/main.network.js';
import {reportsService} from "../services/main.service.js";

export const getTotalAmountByDayOfWeek = async (req, res, next) => {
    const user = req.body.user
    const role = req.body.role
    try {
        const response = await reportsService.getTotalAmountByDayOfWeek(user, role)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    }catch (e) {
        console.log(e)
        next(e)
    }
}

export const getTotalRecordsByDayOfWeek = async (req, res, next) => {
    const user = req.body.user
    const role = req.body.role
    try {
        const response = await reportsService.getTotalRecordsByDayOfWeek(user, role)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    }catch (e) {
        console.log(e)
        next(e)
    }
}

export const getTotalRecordsAndAmountByActiveCampaign = async (req, res, next) => {
    const user = req.body.user
    const role = req.body.role
    try {
        const response = await reportsService.getTotalRecordsAndAmount(user, role)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    }catch (e) {
        console.log(e)
        next(e)
    }
}

export const getDonationsConsolidatedByHour = async(req, res, next) => {
    const user = req.body.user
    const role = req.body.role
    try {
        const response = await reportsService.getDonationsConsolidatedByHour(user, role)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    }catch (e) {
        console.log(e)
        next(e)
    }
}