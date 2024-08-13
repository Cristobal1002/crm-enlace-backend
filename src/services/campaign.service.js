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
    const { status, name, rhema } = query;

    // Construir la consulta de filtrado
    const whereClause = {};

    if (status) {
        whereClause.status = status;
    }
    if (name) {
        whereClause.name = { [Op.iLike]: `%${name}%` };
    }
    if (rhema) {
        whereClause.rhema = { [Op.iLike]: `%${rhema}%` };
    }

    try {
        const { count, rows } = await model.CampaignModel.findAndCountAll({
            where: whereClause,
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [
                ['status', 'DESC'], // Priorizar status true (true = 1, false = 0)
                ['createdAt', 'DESC'], // Ordenar por fecha de creación de manera descendente
            ],
        });

        return {
            data: {
                totalItems: count,
                totalPages: Math.ceil(count / pageSize),
                currentPage: page,
                items: rows,
            },
            error: null,
            warning: null
        };
    } catch (e) {
        throw CustomError({
            message: `Error al intentar traer la lista de campañas`,
            code: 500,
            data: e.errors
        });
    }
};

export const getActiveCampaign = async () => {
    try {
        const campaign = await model.CampaignModel.findAll({where:{status: true}})
        return { data: campaign, error: null, warning: null };
    } catch (e) {
        throw CustomError({message: `Error al intentar traer la campaña activa`, code:500, data:e.errors})
    }
}

export const inactivateCurrent = async (data) => {
    try {
        const active = await  getActiveCampaign()
        if (!active.data.length) {
            return { error: 'No hay una campaña activa', warning: null };
        }
        const [affectedRows, updatedRows] = await model.CampaignModel.update( data, {
            where: {id: active.data[0].id},
            returning: true
        })
        return {data:updatedRows[0], error:null, warning:null}
    } catch (e) {
        throw CustomError({message: `Error al inactivar la campaña`, code:500, data:e.errors})
    }
}

export const updateCampaign = async (id, data) => {
    try{
        const [affectedRows, updatedRows] = await model.CampaignModel.update(data,{
            where: {id},
            returning: true
        });
        return {data:updatedRows[0], error:null, warning:null}
    } catch (e) {
        throw CustomError({message: `Error al actualizar el usuario`, code:500, data:e.errors})
    }
}

