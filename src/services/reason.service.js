import {model} from "../models/main.model.js";
import {CustomError} from "../errors/main.error.js"
import {Op} from "sequelize";

export const createReason = async (data) => {
    try {
        const reason = await model.ReasonsModel.create(data)
        return { data: reason, error: null, warning: null };
    } catch (e) {
        throw CustomError({message: `Error al crear el motivo de oración`, code:500, data:e.errors})
    }
}

export const getReasonList = async (page, pageSize, query) => {
    const { name, status} = query;

    // Construir la consulta de filtrado
    const whereClause = {};

    if (name) {
        whereClause.name = { [Op.iLike]: `%${name}%` };
    }
    if (status) {
        whereClause.status = status;
    }

    try {
        const { count, rows } = await model.ReasonsModel.findAndCountAll({
            where: whereClause,
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [
                ['name', 'ASC'], // Priorizar status true (true = 1, false = 0)
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
            message: `Error al intentar traer la lista de motivos de oración`,
            code: 500,
            data: e.errors
        });
    }
};

export const updateReason = async (id, data) => {
    try{
        const [affectedRows, updatedRows] = await model.ReasonsModel.update(data,{
            where: {id},
            returning: true
        });
        return {data:updatedRows[0], error:null, warning:null}
    } catch (e) {
        throw CustomError({message: `Error al actualizar el motivo de oración`, code:500, data:e.errors})
    }
}
