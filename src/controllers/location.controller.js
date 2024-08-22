import {responses} from '../network/main.network.js'
import {locationService} from '../services/main.service.js'

export const getCountries = async(req, res, next) => {
    try {
        const response = await locationService.getCountries()
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.unauthorized(req, res, response.error)}
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const getStatesByCountry = async(req, res, next) => {
    const country =  req.query.countryId
    try {
        const response = await locationService.getStatesByCountry(country)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.unauthorized(req, res, response.error)}
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const getCitiesByState = async(req, res, next) => {
    const state = req.query.stateId
    try {
        const response = await locationService.getCitiesByState(state)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.unauthorized(req, res, response.error)}
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const getStateByCity = async(req, res, next) => {
    const state = req.query.stateId
    try {
        const response = await locationService.getStateByCity(state)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.unauthorized(req, res, response.error)}
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const getCitiesByCountry = async(req, res, next) => {
    const country = req.query.countryId
    try {
        const response = await locationService.getCitiesByCountry(country)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.unauthorized(req, res, response.error)}
    } catch (e) {
        console.log(e)
        next(e)
    }
}