import {responses} from '../network/main.network.js'
import {donationService} from "../services/main.service.js";

export const createDonation = async(req, res, next) => {
    try {
        const response = await donationService.createDonation(req.body)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    }catch (e) {
        console.log(e);
        next(e)
    }
}