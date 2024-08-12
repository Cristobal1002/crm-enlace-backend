import {body} from 'express-validator'

export const createCampaignValidator = [
    body('name').isString().notEmpty().withMessage('Name must be a string and not empty'),
    body('goal').isInt().notEmpty().withMessage('Goal must be a number and not empty'),
    body('rhema').isString().notEmpty().withMessage('Rhema must be a string and not empty'),
    body('phrase').isString().notEmpty().withMessage('Phrase must be a text and not empty'),
    body('status').isBoolean().notEmpty().withMessage('Status must be a boolean and not empty'),
    body('created_by').isInt().notEmpty().withMessage('created_by must be an id and not empty'),
    body('updated_by').isInt().notEmpty().withMessage('updated_by must be an id and not empty')
]