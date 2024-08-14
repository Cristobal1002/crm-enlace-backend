import {responses} from '../network/main.network.js'
import {customerService} from '../services/main.service.js'

export const createCustomer = async (req, res, next) => {
    try {
        const response = await customerService.createCustomer(req.body)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    } catch (e) {
        console.log(e)
        next(e)
    }
}
