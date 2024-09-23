import {model} from "../models/main.model.js";
import {CustomError} from "../errors/main.error.js";
import moment from 'moment-timezone';
import {col, fn, literal, Op} from "sequelize";
import ExcelJS from 'exceljs'
import UserModel from "../models/user.model.js";
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

export const getDonationsByCampaign = async (campaignId) => {
    try {
        const donations = await model.DonationModel.findAll({
            where: { campaign_id: campaignId },
            include: [
                {
                    model: model.BankModel,
                    attributes: ['name']
                },
                {
                    model: model.CustomerModel,
                    attributes: ['first_name', 'last_name', 'email', 'phone', 'birthday', 'document','document_type'],
                    include: [
                        {
                            model: model.CountryModel,
                            attributes: ['name']
                        },
                        {
                            model: model.StateModel,
                            attributes: ['name']
                        },
                        {
                            model: model.CityModel,
                            attributes: ['name']
                        }
                    ]
                },
                {
                    model: model.CampaignModel,
                    attributes: ['name']
                },
                {
                    model: model.UserModel,
                    attributes: ['name']
                },
                {
                    model: model.ReasonsModel, // Modelo de razones (motivos)
                    attributes: ['name'],
                    through: { attributes: [] }, // Omite las columnas de la tabla intermedia
                },
                {
                    model: model.NoveltyModel, // Modelo de razones (motivos)
                    attributes: ['name'],
                    through: { attributes: [] }, // Omite las columnas de la tabla intermedia
                }
            ],
            order:[
                ['createdAt', 'ASC'],  // Cambia 'createdAt' al nombre de tu campo de fecha si es diferente
                ['id', 'ASC']
            ]
        });

        // Aplanamos el resultado y concatenamos las razones
        const flattenedDonations = donations.map(donation => ({
            campaign_name: donation.CampaignModel.name,
            donation_id: donation.id,
            donation_date: donation.createdAt,
            petition: donation.petition,
            testimony: donation.testimony,
            quotes: donation.quotes,
            amount: donation.amount,
            total_amount: donation.total_amount,
            bank_name: donation.BankModel.name,
            name: `${donation.CustomerModel.first_name} ${donation.CustomerModel.last_name}` || donation.CustomerModel.company_name,
            document: donation.CustomerModel.document,
            document_type: donation.CustomerModel.document_type,
            customer_email: donation.CustomerModel.email,
            customer_phone: donation.CustomerModel.phone,
            customer_country: donation.CustomerModel.CountryModel.name,
            customer_state: donation.CustomerModel.StateModel.name,
            customer_city: donation.CustomerModel.CityModel.name,
            reasons_names: donation.ReasonsModels.map(reason => reason.name).join(', ') ,// Concatenar los nombres de las razones
            novelties_names: donation.NoveltyModels.map(novelty => novelty.name).join(', '), // Concatenar los nombres de las razones
            username: donation.UserModel.name
        }));

        return {data:flattenedDonations, error:null, warning: null};
    } catch (e) {
        console.error(e);
        throw new CustomError({ message: 'Error al obtener el reporte de donaciones', code: 500, data: e.errors || e.message });
    }
};

export const exportDonationsReports = async (campaignId) => {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Donations Report');

        const reportData = await getDonationsByCampaign(campaignId);
        // Definir encabezados
        worksheet.columns = [
            { header: 'Nombre de campaña', key: 'campaign_name' },
            { header: 'Numero de donacion', key: 'donation_id' },
            { header: 'Fecha de registro', key: 'donation_date' },
            { header: 'Tipo de documento', key: 'document_type' },
            { header: 'Documento', key: 'document' },
            { header: 'Nombre', key: 'name' },
            { header: 'Cuotas', key: 'quotes' },
            { header: 'Valor', key: 'amount' },
            { header: 'Valor total', key: 'total_amount' },
            { header: 'Banco', key: 'bank_name' },
            { header: 'Telefono', key: 'customer_phone' },
            { header: 'Email', key: 'customer_email' },
            { header: 'Pais', key: 'customer_country' },
            { header: 'Estado', key: 'customer_state' },
            { header: 'Ciudad', key: 'customer_city' },
            { header: 'Motivos de oracion', key: 'reasons_names' },
            { header: 'Novedades', key: 'novelties_names' },
            { header: 'Peticion', key: 'petition' },
            { header: 'Testimonio', key: 'testimony' },
            { header: 'Registered By', key: 'username' },
        ];

        // Añadir los datos
        reportData.data.forEach(donation => {
            worksheet.addRow(donation);
        });

        // Devolver el archivo Excel generado
        return await workbook.xlsx.writeBuffer();

    } catch (e) {
        console.error(e);
        throw new CustomError({ message: 'Error al crear el archivo de excel', code: 500, data: e.errors || e.message });
    }
}

