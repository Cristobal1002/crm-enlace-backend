import {model} from "../models/main.model.js";
import {CustomError} from "../errors/main.error.js";
import {Op} from "sequelize";

export const createCampaign = async (data) => {
    try {
        const register = await model.CampaignModel.create(data);
        return { data: register, error: null, warning: null };
    } catch (error) {
        console.error('Error creating campaign:', error);

        // Manejo de errores detallado
        let errorMessage = 'Error al crear la campaña';
        if (error.name === 'SequelizeValidationError') {
            errorMessage = 'Validation error occurred';
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            errorMessage = 'A campaign with this identifier already exists';
        }

        throw new CustomError({ message: errorMessage, code: 500, data: error.errors || error.message });
    }
};

export const getCampaignList = async (page, pageSize, query) => {

    const { status, name, rhema } = query
    // Construir la consulta de filtrado
    const whereClause = {};

    if (status) {whereClause.status = status}
    if (name) {whereClause.name = { [Op.iLike]: `%${name}%` }}
    if (rhema) {whereClause.rhema = { [Op.iLike]: `%${rhema}%` }}

    try {
        const { count, rows } = await model.CampaignModel.findAndCountAll({
            where: whereClause,
            limit: pageSize,
            offset: (page - 1) * pageSize,
        });
        return {data:{
                totalItems: count,
                totalPages: Math.ceil(count / pageSize),
                currentPage: page,
                users: rows,
            }, error:null, warning:null}
    } catch (e){
        throw CustomError({message: `Error al intentar traer la lista de campañas`, code:500, data:e.errors})
    }
}

export const getActiveCampaign = async () => {
    try {
        const campaign = await model.CampaignModel.findAll({where:{status: true}})
        return { data: campaign, error: null, warning: null };
    } catch (e) {
        throw CustomError({message: `Error al intentar traer la campaña activa`, code:500, data:e.errors})
    }
}

