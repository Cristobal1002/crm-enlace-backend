import  express  from 'express';
import { customerController} from '../controllers/main.controller.js'
import {customerValidator} from "../validators/main.validator.js";
import { validateRequestMiddleware, validateToken, validateAdmin } from '../middleware/main.middleware.js'

export const customer = express.Router();

customer.post(``,validateToken.checkToken, validateAdmin.isAdmin, customerValidator.createCustomerValidator, validateRequestMiddleware.validateRequest, customerController.createCustomer);
customer.get('/list',validateToken.checkToken, validateRequestMiddleware.validateRequest,customerController.getCustomerList)

//Esta ruta siempre dejarla de ultimas sino jode por problema de javascript
customer.put(`/:id`, validateToken.checkToken, validateAdmin.isAdmin, validateRequestMiddleware.validateRequest, customerController.updateCustomer)