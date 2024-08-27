import {body} from "express-validator";

export const createReasonValidator = [
    body('name').notEmpty().isString().withMessage('Name field is required'),
    body('status').notEmpty().isBoolean().withMessage('Status field is requires'),
    body('created_by').notEmpty().isInt().withMessage('Created by field is requires and must be number'),
    body('updated_by').notEmpty().isInt().withMessage('Updated by field is requires and must be number')
]