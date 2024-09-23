import  express  from 'express';
import {reportsController} from "../controllers/main.controller.js";
import { validateRequestMiddleware, validateToken, validateAdmin } from '../middleware/main.middleware.js'

export const reports = express.Router();

reports.post(`/total-amount-by-day`, validateToken.checkToken, validateRequestMiddleware.validateRequest, reportsController.getTotalAmountByDayOfWeek)
reports.post(`/total-records-by-day`, validateToken.checkToken, validateRequestMiddleware.validateRequest, reportsController.getTotalRecordsByDayOfWeek)
reports.post(`/total-records-amount`, validateToken.checkToken, validateRequestMiddleware.validateRequest, reportsController.getTotalRecordsAndAmountByActiveCampaign)
reports.post(`/daily-hour-consolidate`, validateToken.checkToken, validateRequestMiddleware.validateRequest, reportsController.getDonationsConsolidatedByHour)
reports.get(`/donations-by-campaign`, validateToken.checkToken, validateAdmin.isAdmin, validateRequestMiddleware.validateRequest, reportsController.getDonationsByCampaign)
reports.get(`/donations-by-campaign/export/:campaignId`, validateToken.checkToken, validateAdmin.isAdmin, validateRequestMiddleware.validateRequest, reportsController.exportDonationsByCampaign)

