import  express  from 'express';
import { userController } from '../controllers/main.controller.js';
import { authValidator } from '../validators/main.validator.js';
import { validateRequestMiddleware, validateToken } from '../middleware/main.middleware.js'
export const auth = express.Router();

auth.post(`/auth`, validateRequestMiddleware.validateRequest, userController.register)