import { body } from 'express-validator'

export const loginValidator = [
    body('user').isString().notEmpty().withMessage('User is a required field'),
    body('password').notEmpty().withMessage('Password is a required field')
]