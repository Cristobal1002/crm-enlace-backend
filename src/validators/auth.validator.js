import { body } from 'express-validator'

export const loginValidator = [
    body('email').isEmail().notEmpty().withMessage('Email is a required field'),
    body('password').notEmpty().withMessage('Password is a required field')
]