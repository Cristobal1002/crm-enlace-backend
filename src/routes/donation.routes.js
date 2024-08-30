import  express  from 'express';
import {donationController} from "../controllers/main.controller.js";
import {donationValidator} from "../validators/main.validator.js";
import { validateRequestMiddleware, validateToken, validateAdmin } from '../middleware/main.middleware.js'

export const donation = express.Router();

donation.post(``, validateToken.checkToken,donationValidator.createDonationValidator,validateRequestMiddleware.validateRequest, donationController.createDonation)