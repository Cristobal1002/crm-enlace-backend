import {model} from "../models/main.model.js";
import {CustomError} from "../errors/main.error.js";
import moment from 'moment-timezone';
import {col, fn, literal, Op} from "sequelize";

export const getTotalAmountByDayOfWeek = async (user, role) => {
    try {
        const whereCondition = role === 'admin' ? {} : { user_id: user };

        // Definir los límites de la semana actual
        const startOfWeek = literal("DATE_TRUNC('week', NOW()::timestamp AT TIME ZONE 'America/Bogota')"); // Lunes a las 00:00
        const endOfWeek = literal("DATE_TRUNC('week', NOW()::timestamp AT TIME ZONE 'America/Bogota') + INTERVAL '6 days'"); // Domingo a las 23:59:59

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
            where: {
                ...whereCondition,
                createdAt: {
                    [Op.between]: [startOfWeek, endOfWeek], // Filtrar por la semana en curso
                },
            },
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
        const whereCondition = role === 'admin' || role === 'infinity' ? {} : { user_id: user };

        // Definir los límites de la semana actual
        const startOfWeek = literal("DATE_TRUNC('week', NOW()::timestamp AT TIME ZONE 'America/Bogota')"); // Lunes a las 00:00
        const endOfWeek = literal("DATE_TRUNC('week', NOW()::timestamp AT TIME ZONE 'America/Bogota') + INTERVAL '6 days'"); // Domingo a las 23:59:59

        const totals = await model.DonationModel.findAll({
            attributes: [
                [literal('EXTRACT(DOW FROM ("DonationModel"."createdAt" AT TIME ZONE \'America/Bogota\'))'), 'dayOfWeek'],
                [fn('COUNT', col('*')), 'totalRecords'] // Contar los registros
            ],
            include: [{
                model: model.CampaignModel,
                where: { status: true }, // Filtra por campaña activa
                attributes: []
            }],
            where: {
                ...whereCondition,
                createdAt: {
                    [Op.between]: [startOfWeek, endOfWeek], // Filtrar por la semana en curso
                },
            },
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
        const whereCondition = role === 'admin' || role === 'infinity' ? {} : { user_id: user };

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
export const getDonationsConsolidatedByHour = async (user, role) => {
    try {
        console.log('Role en reporte grande', role !== 'admin')
        // Definir la zona horaria
        const timeZone = 'America/Bogota';

        const now = moment.tz(timeZone);// Crear el inicio y fin del día en la zona horaria especificada
        const startOfDay = now.clone().startOf('day')
        const endOfDay = now.clone().endOf('day')

        // Definir la condición WHERE
        const whereCondition = {
            createdAt: {
                [Op.between]: [startOfDay, endOfDay]
            }
        };

        if (role !== 'admin' && role !== 'infinity') {
            whereCondition.user_id = user;
        }

        // Consulta para obtener el consolidado por horas
        const totals = await model.DonationModel.findAll({
            attributes: [
                [literal('EXTRACT(HOUR FROM ("DonationModel"."createdAt" AT TIME ZONE \'America/Bogota\'))'), 'hour'],
                [fn('COUNT', col('"DonationModel"."id"')), 'totalDonations'],
                ...(role === 'admin' || role === 'infinity' ? [[fn('SUM', col('"DonationModel"."total_amount"')), 'totalAmount']] : [])
            ],
            include: [{
                model: model.CampaignModel,
                where: { status: true }, // Filtra por campaña activa
                attributes: []
            }],
            where: whereCondition,
            group: [literal('EXTRACT(HOUR FROM ("DonationModel"."createdAt" AT TIME ZONE \'America/Bogota\'))')],
            order: [literal('EXTRACT(HOUR FROM ("DonationModel"."createdAt" AT TIME ZONE \'America/Bogota\')) ASC')],
            raw: true // Asegúrate de que se está obteniendo un formato adecuado para los datos
        });

        console.log('Query Results:', totals);

        return { data: totals, error: null, warning: null };
    } catch (e) {
        console.error(e);
        throw new CustomError({ message: 'Error al obtener el reporte por horas', code: 500, data: e.errors || e.message });
    }
};


