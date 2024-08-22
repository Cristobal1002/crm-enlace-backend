import {body, query} from "express-validator";

export const countryValidator = [
    query('countryId').isInt().withMessage('StateId is required param')
]

export const stateValidator = [
    query('stateId').isInt().withMessage('StateId is required param')
]

