import  express  from 'express';
import {bankController} from "../controllers/main.controller.js";
import {bankValidator} from "../validators/main.validator.js"
import { validateRequestMiddleware, validateToken, validateAdmin } from '../middleware/main.middleware.js'

export const bank = express.Router();

bank.post(``, validateToken.checkToken, validateAdmin.isAdmin, bankValidator.createBankValidator, validateRequestMiddleware.validateRequest, bankController.createBank)
bank.get(`/list`, validateToken.checkToken, validateAdmin.isAdmin, validateRequestMiddleware.validateRequest, bankController.getBankList)
bank.get(`/list/active`, validateToken.checkToken, validateRequestMiddleware.validateRequest, bankController.getActiveBankList)



// Aquí el put que toca dejar de últimas si no jode las otras rutas
bank.put(`/:id`, validateToken.checkToken, validateAdmin.isAdmin,  validateRequestMiddleware.validateRequest, bankController.updateBank)