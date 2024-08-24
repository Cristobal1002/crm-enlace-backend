import {body} from 'express-validator'

export const createCustomerValidator = [
    body(`company_name`).optional().isString().withMessage('Comapny name is a required field and must be string'),
    body(`first_name`).optional().isString().withMessage('first name is a required field and must be string'),
    body(`first_name`).optional().isString().withMessage('last name is a required field and must be string'),
    body(`document`).isNumeric().notEmpty().withMessage('Document is a required field and must be number'),
    body(`document_type`).isString().notEmpty().withMessage('Document type is a required field and must be number'),
    body(`phone`).isString().notEmpty().withMessage('Phone is a required field and must be string'),
    body(`email`).isEmail().notEmpty().withMessage('Email is a required field and must be email'),
    body(`birthday`).optional().notEmpty().withMessage('Birthday is a required field and must be string'),
    body(`gender`).optional().isString().notEmpty().withMessage('Gender is a required field and must be string'),
    body(`country_id`).isInt().notEmpty().withMessage('Country is a required field and must be numeric (id)'),
    body(`state_id`).isInt().notEmpty().withMessage('Department is a required field and must be numeric (id)'),
    body(`city_id`).isInt().notEmpty().withMessage('City is a required field and must be numeric (id)'),
    body(`neighborhood`).isString().notEmpty().withMessage('Neighborhood is a required field and must be string'),
    body(`address`).isString().notEmpty().withMessage('Address is a required field and must be string'),
    body(`created_by`).isInt().notEmpty().withMessage('Created_by is a required field and must be numeric (id)'),
    body(`updated_by`).isInt().notEmpty().withMessage('Updated_by is a required field and must be numeric (id)')

]