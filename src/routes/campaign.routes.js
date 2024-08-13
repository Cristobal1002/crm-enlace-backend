import  express  from 'express';
import {campaignController} from "../controllers/main.controller.js";
import {campaignValidator} from "../validators/main.validator.js";
import { validateRequestMiddleware, validateToken, validateAdmin } from '../middleware/main.middleware.js'

export const campaign = express.Router();

campaign.post(``, validateToken.checkToken, validateAdmin.isAdmin, campaignValidator.createCampaignValidator, validateRequestMiddleware.validateRequest, campaignController.createCampaign )
campaign.get(`/active`,validateToken.checkToken, validateRequestMiddleware.validateRequest,campaignController.getActive)
campaign.get(`/list`,validateToken.checkToken, validateRequestMiddleware.validateRequest,campaignController.getCampaignList)
campaign.post(`/inactivate`, validateToken.checkToken, validateAdmin.isAdmin,validateRequestMiddleware.validateRequest, campaignController.inactivateCurrent)
campaign.put(`/activate`, campaignController.activateCampaign)
//Esta ruta ultima toca dejarla debajo porque sino se come las otras por que es un comodin
campaign.put(`/:id`, validateToken.checkToken, validateAdmin.isAdmin,validateRequestMiddleware.validateRequest, campaignController.updateCampaign)


