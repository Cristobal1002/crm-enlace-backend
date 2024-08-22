import  express  from 'express';
import {locationController} from "../controllers/main.controller.js"
import {locationValidator} from "../validators/main.validator.js"
import { validateRequestMiddleware, validateToken, validateAdmin } from '../middleware/main.middleware.js'

export const location = express.Router();

location.get(`/countries`, validateRequestMiddleware.validateRequest, locationController.getCountries)
location.get(`/states`,locationValidator.countryValidator, validateRequestMiddleware.validateRequest, locationController.getStatesByCountry)
location.get(`/cities`,locationValidator.stateValidator, validateRequestMiddleware.validateRequest, locationController.getCitiesByState)
location.get(`/states/by-city`,locationValidator.stateValidator, validateRequestMiddleware.validateRequest,locationController.getStateByCity)
location.get(`/cities/by-country`, validateRequestMiddleware.validateRequest, locationController.getCitiesByCountry)