import  express  from 'express';
import {authController} from "../controllers/main.controller.js";
import { authValidator } from '../validators/main.validator.js';
import { validateRequestMiddleware, validateToken } from '../middleware/main.middleware.js'
export const auth = express.Router();

auth.post(`/login`,authValidator.loginValidator, validateRequestMiddleware.validateRequest, authController.login)
auth.get(`/validate`, validateToken.checkToken,validateRequestMiddleware.validateRequest, authController.validate )