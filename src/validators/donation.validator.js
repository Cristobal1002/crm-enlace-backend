import {body} from "express-validator";

export const createDonationValidator = [
    body('campaign_id').notEmpty().isInt().withMessage('Campaign id is a required field and must be int'),
    body('petition').notEmpty().isString().withMessage('Petition field is required'),
    body('testimony').optional(),
    body('account_id').notEmpty().isInt().withMessage('Account_id is a required fiel'),
    body('customer_id').notEmpty().isInt().withMessage('Customer_id is a required field'),
    body('user_id').notEmpty().isInt().withMessage('user_id is a required field'),
    body('quotes').notEmpty().isInt().withMessage('Quotes is a required field'),
    body('amount').notEmpty().isInt().withMessage('Amount is a requires field'),
    body('total_amount').notEmpty().isInt().withMessage('Total_amount is a requires field')

]