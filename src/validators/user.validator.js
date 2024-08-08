import {body, query} from 'express-validator'

export const createUserValidator = [
    body('name').isString().notEmpty().withMessage('Name must be a string and not empty'),
    body('document').isInt().notEmpty().withMessage('Document must be an integer and not empty'),
    body('phone').isString().notEmpty().withMessage('Phone must be a string and not empty'),
    body('roll')
        .isString().notEmpty().withMessage('Roll must be a string and not empty')
        .isIn(['admin', 'basic']).withMessage('Roll must be either admin or basic'),
    body('email').isEmail().notEmpty().withMessage('Email must be a valid email and not empty'),
];

export const getQueryValidator = [
    query('document').optional().isInt().withMessage('Document must be a number')
]
