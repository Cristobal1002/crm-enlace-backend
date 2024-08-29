import  express  from 'express';
import {noveltyController} from "../controllers/main.controller.js";
import {noveltyValidator} from "../validators/main.validator.js";
import { validateRequestMiddleware, validateToken, validateAdmin } from '../middleware/main.middleware.js'

export const novelty = express.Router();

novelty.post(``, validateToken.checkToken, validateAdmin.isAdmin, noveltyValidator.createNoveltyValidator, validateRequestMiddleware.validateRequest, noveltyController.createNovelty)
novelty.get(`/list`,validateToken.checkToken,validateRequestMiddleware.validateRequest, noveltyController.getNoveltyList )
novelty.get(`/list/active`,validateToken.checkToken,validateRequestMiddleware.validateRequest, noveltyController.getActiveNoveltyList )


novelty.put(`/:id`, validateToken.checkToken, validateAdmin.isAdmin, validateRequestMiddleware.validateRequest, noveltyController.updateNovelty)
