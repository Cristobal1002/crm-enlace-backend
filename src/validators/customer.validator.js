import {body} from 'express-validator'

export const createCustomerValidator = [
    body(`name`).isString().notEmpty().withMessage('Name is a required field and must be string'),
    body(`document`).isNumeric().notEmpty().withMessage('Document is a required field and must be number'),
    body(`phone`).isString().notEmpty().withMessage('Phone is a required field and must be string'),
    body(`email`).isEmail().notEmpty().withMessage('Email is a required field and must be email'),
    body(`birthday`).isDate().notEmpty().withMessage('Birthday is a required field and must be string'),
    body(`gender`).isString().notEmpty().withMessage('Gender is a required field and must be string'),
    body(`country_id`).isInt().notEmpty().withMessage('Country is a required field and must be numeric (id)'),
    body(`department_id`).isInt().notEmpty().withMessage('Department is a required field and must be numeric (id)'),
    body(`city_id`).isInt().notEmpty().withMessage('City is a required field and must be numeric (id)'),
    body(`neighborhood`).isString().notEmpty().withMessage('Neighborhood is a required field and must be string'),
    body(`address`).isString().notEmpty().withMessage('Address is a required field and must be string'),
    body(`created_by`).isInt().notEmpty().withMessage('Created_by is a required field and must be numeric (id)'),
    body(`updated_by`).isInt().notEmpty().withMessage('Updated_by is a required field and must be numeric (id)')

]