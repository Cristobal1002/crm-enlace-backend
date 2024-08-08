import  express  from 'express';
import { userController } from '../controllers/main.controller.js';
import { userValidator } from '../validators/main.validator.js';
import { validateRequestMiddleware, validateToken } from '../middleware/main.middleware.js'
import {validateRequest} from "../middleware/validate-request.middleware.js";
export const user = express.Router();

user.post(``, userValidator.createUserValidator, validateRequestMiddleware.validateRequest, userController.register);
user.put(`/:id`, userController.updateUser)
user.get(`/list`, userValidator.getQueryValidator, validateRequestMiddleware.validateRequest, userController.getUsers)