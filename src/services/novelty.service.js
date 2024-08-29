import {model} from "../models/main.model.js";
import {CustomError} from "../errors/main.error.js"
import {Op} from "sequelize";

export const createNovelty = async (data) => {
    try {
        const novelty = await model.NoveltyModel.create(data)
        return { data: novelty, error: null, warning: null };
    } catch (e) {
        throw CustomError({message: `Error al crear el motivo de oración`, code:500, data:e.errors})
    }
}

export const getNoveltyList = async (page, pageSize, query) => {
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
        const { count, rows } = await model.NoveltyModel.findAndCountAll({
            where: whereClause,
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [
                ['name', 'DESC'], // Priorizar status true (true = 1, false = 0)
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
            message: `Error al intentar traer la lista de motivos de oración`,
            code: 500,
            data: e.errors
        });
    }
};

export const updateNovelty = async (id, data) => {
    try{
        const [affectedRows, updatedRows] = await model.NoveltyModel.update(data,{
            where: {id},
            returning: true
        });
        return {data:updatedRows[0], error:null, warning:null}
    } catch (e) {
        throw CustomError({message: `Error al actualizar la novedad`, code:500, data:e.errors})
    }
}

export const getActiveNovelties = async() => {
    try {
        const novelties = await model.NoveltyModel.findAll({
            where:{status: true}
        })
        return {data: novelties, error: null, warning: null}
    }catch (e) {
        throw CustomError({message: `Error al traer las novedades activas`, code:500, data:e.errors})

    }
}
