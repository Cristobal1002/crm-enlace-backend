import { body } from 'express-validator'

export const createUserValidator = [
    body('name').isString().notEmpty().withMessage('Name must be a string '),
    body('lastname').isString().notEmpty().withMessage('Lastname must be a string '),
    body('email').isEmail().notEmpty().withMessage('Email must be a valid email'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one numeric digit')
        .matches(/[!@#$%^&*(),.?':{}|<>]/)
        .withMessage('Password must contain at least one special character'),
]

export const loginValidator = [
    body('email').isEmail().notEmpty().withMessage('Email is a required field'),
    body('password').notEmpty().withMessage('Password is a required field')
]