import {body} from "express-validator";

export const createBankValidator = [
    body('name').notEmpty().isString().withMessage('Name of entity is required'),
    body('account_number').notEmpty().isString().withMessage('Account number is required'),
    body('status').notEmpty().isBoolean().withMessage('Status field is required')
]