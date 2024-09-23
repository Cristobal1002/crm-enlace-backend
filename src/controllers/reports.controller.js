import {responses} from '../network/main.network.js';
import {reportsService} from "../services/main.service.js";

export const getTotalAmountByDayOfWeek = async (req, res, next) => {
    const user = req.body.user
    const role = req.body.role
    try {
        const response = await reportsService.getTotalAmountByDayOfWeek(user, role)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    }catch (e) {
        console.log(e)
        next(e)
    }
}

export const getTotalRecordsByDayOfWeek = async (req, res, next) => {
    const user = req.body.user
    const role = req.body.role
    try {
        const response = await reportsService.getTotalRecordsByDayOfWeek(user, role)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    }catch (e) {
        console.log(e)
        next(e)
    }
}

export const getTotalRecordsAndAmountByActiveCampaign = async (req, res, next) => {
    const user = req.body.user
    const role = req.body.role
    try {
        const response = await reportsService.getTotalRecordsAndAmount(user, role)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    }catch (e) {
        console.log(e)
        next(e)
    }
}

export const getDonationsConsolidatedByHour = async(req, res, next) => {
    const user = req.body.user
    const role = req.body.role
    try {
        const response = await reportsService.getDonationsConsolidatedByHour(user, role)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    }catch (e) {
        console.log(e)
        next(e)
    }
}

export const getDonationsByCampaign = async (req, res, next) => {
    const id = req.query.id
    try {
        const response =  await reportsService.getDonationsByCampaign(id)
        if(response.data){ responses.success(req, res, response.data)}
        if(response.error){responses.error(req, res, response.error)}
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const exportDonationsByCampaign = async (req, res, next) => {
    console.log('Param en el export', req.params)
    const {campaignId} = req.params
    try {
        // Llamada al servicio para generar el reporte en Excel
        const excelBuffer = await reportsService.exportDonationsReports(campaignId);

        // Configurar encabezados para la descarga de Excel
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="donations_report.xlsx"');

        // Enviar el archivo Excel
        res.send(excelBuffer);
    } catch (e) {
        console.log(e);
        next(e); // Manejar errores
    }
}