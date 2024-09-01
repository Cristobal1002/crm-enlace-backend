import  express  from 'express';
import { userController } from '../controllers/main.controller.js';
import { userValidator } from '../validators/main.validator.js';
import { validateRequestMiddleware, validateToken, validateAdmin } from '../middleware/main.middleware.js'

export const user = express.Router();

user.post(``,validateToken.checkToken, validateAdmin.isAdmin, userValidator.createUserValidator, validateRequestMiddleware.validateRequest, userController.register);
user.post(`/infinity`, userValidator.createUserValidator, validateRequestMiddleware.validateRequest, userController.createInfinitytUser);
user.put(`/:id`,validateToken.checkToken, validateAdmin.isAdmin, validateRequestMiddleware.validateRequest, userController.updateUser)
user.get(`/list`, userValidator.getQueryValidator, validateRequestMiddleware.validateRequest, userController.getUsers)