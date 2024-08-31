import {model} from "../models/main.model.js";
import {CustomError} from "../errors/main.error.js";
import {col, fn, literal} from "sequelize";

export const getTotalAmountByDayOfWeek = async (user, role) => {
    try {
        const whereCondition = role === 'admin' ? {} : { user_id: user };
        const totals = await model.DonationModel.findAll({
            attributes: [
                [literal('EXTRACT(DOW FROM ("DonationModel"."createdAt" AT TIME ZONE \'America/Bogota\'))'), 'dayOfWeek'],
                [fn('SUM', col('total_amount')), 'totalAmount']
            ],
            include: [{
                model: model.CampaignModel,
                where: { status: true }, // Filtra por campaña activa
                attributes: []
            }],
            where: whereCondition,
            group: [literal('EXTRACT(DOW FROM ("DonationModel"."createdAt" AT TIME ZONE \'America/Bogota\'))')],
            order: [literal('EXTRACT(DOW FROM ("DonationModel"."createdAt" AT TIME ZONE \'America/Bogota\')) ASC')]
        });
        return { data: totals, error: null, warning: null };
    } catch (e) {
        console.log(e);
        throw new CustomError({ message: 'Error al obtener el reporte', code: 500, data: e.errors || e.message });
    }
};

export const getTotalRecordsByDayOfWeek = async (user, role) => {
    try {
        const whereCondition = role === 'admin' ? {} : { user_id: user };
        const totals = await model.DonationModel.findAll({
            attributes: [
                // Ajustamos la extracción del día de la semana considerando la zona horaria
                [literal('EXTRACT(DOW FROM ("DonationModel"."createdAt" AT TIME ZONE \'America/Bogota\'))'), 'dayOfWeek'],
                // Contamos el número total de registros
                [fn('COUNT', col('*')), 'totalRecords']
            ],
            include: [{
                model: model.CampaignModel,
                where: { status: true }, // Filtra por campaña activa
                attributes: []
            }],
            where: whereCondition,
            group: [literal('EXTRACT(DOW FROM ("DonationModel"."createdAt" AT TIME ZONE \'America/Bogota\'))')],
            order: [literal('EXTRACT(DOW FROM ("DonationModel"."createdAt" AT TIME ZONE \'America/Bogota\')) ASC')]
        });
        return { data: totals, error: null, warning: null };
    } catch (e) {
        console.log(e);
        throw new CustomError({ message: 'Error al obtener el reporte', code: 500, data: e.errors || e.message });
    }
};

export const getTotalRecordsAndAmount = async (user, role) => {
    try {
        const whereCondition = role === 'admin' ? {} : { user_id: user };

        const totals = await model.DonationModel.findOne({
            attributes: [
                [fn('COUNT', col('DonationModel.id')), 'totalRecords'],
                [fn('SUM', col('DonationModel.total_amount')), 'totalAmount']
            ],
            include: [{
                model: model.CampaignModel,
                where: { status: true }, // Filtra por campaña activa
                attributes: []
            }],
            where: whereCondition,
            // No necesitamos la columna 'id' aquí, así que eliminamos cualquier referencia a ella en 'group'
            group: [] // Asegúrate de que no haya agrupación
        });

        return { data: totals, error: null, warning: null };
    } catch (e) {
        console.log(e);
        throw new CustomError({ message: 'Error al obtener el reporte', code: 500, data: e.errors || e.message });
    }
};

