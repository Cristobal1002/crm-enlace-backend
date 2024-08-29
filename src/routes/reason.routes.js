import  express  from 'express';
import {reasonController} from "../controllers/main.controller.js";
import {reasonValidator} from "../validators/main.validator.js";
import { validateRequestMiddleware, validateToken, validateAdmin } from '../middleware/main.middleware.js'

export const reason = express.Router();

reason.post(``, validateToken.checkToken, validateAdmin.isAdmin, reasonValidator.createReasonValidator, validateRequestMiddleware.validateRequest, reasonController.createReason)
reason.get(`/list`,validateToken.checkToken,validateRequestMiddleware.validateRequest, reasonController.getReasonList )
reason.get(`/list/active`,validateToken.checkToken,validateRequestMiddleware.validateRequest, reasonController.getActiveReasonsList )

reason.put(`/:id`, validateToken.checkToken, validateAdmin.isAdmin, validateRequestMiddleware.validateRequest, reasonController.updateReason)
