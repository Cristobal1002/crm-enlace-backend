import {model} from "../models/main.model.js";
import {CustomError} from "../errors/main.error.js";

export const getCountries = async () => {
    try{
        const cities = await model.CountryModel.findAll()
        return { data: cities, error: null, warning: null };
    }catch (e) {
        console.log(e)
        throw CustomError({message: `Error al intentar traer  los paises`, code:500, data:e.errors})
    }
}

export const getStatesByCountry = async (country_id) => {
    try{
        const states= await model.StateModel.findAll({
            where: {country_id}
        })
        return {data:states, error:null, warning:null}
    }catch (e) {
        console.log(e)
        throw CustomError({message: `Error al intentar traer  los estados`, code:500, data:e.errors})
    }
}

export const getCitiesByState = async (state_id) => {
    try {
        const cities = await model.CityModel.findAll({
            where: {state_id}
        })
        return {data:cities, error:null, warning:null}
    } catch (e) {
        console.log(e)
        throw CustomError({message: `Error al intentar traer  las ciudades`, code:500, data:e.errors})
    }
}

export const getStateByCity = async(state_id) => {
    try {
        const states = await model.StateModel.findAll({
            where: {id:state_id}
        })
        return {data: states, error:null, warning:null}
    } catch (e) {
        console.log(e)
        throw CustomError({message: `Error al intentar traer  los estados`, code:500, data:e.errors})
    }
}

export const getCitiesByCountry = async(country_id) => {
    try {
        const cities = await model.CityModel.findAll({
            where: {country_id}
        })
        return {data: cities, error:null, warning:null}
    } catch (e) {
        console.log(e)
        throw CustomError({message: `Error al intentar traer  los estados`, code:500, data:e.errors})
    }
}