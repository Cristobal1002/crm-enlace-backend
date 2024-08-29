import {model} from "../models/main.model.js";
import {CustomError} from "../errors/main.error.js"
import {Op} from "sequelize";

export const createBank = async (data) => {
    try {
        const bank = await model.BankModel.create(data)
        return { data: bank, error: null, warning: null };
    } catch (error) {
        console.error('Error creating campaign:', error);

        // Manejo de errores detallado
        let errorMessage = 'Error al crear el banco';
        if (error.name === 'SequelizeValidationError') {
            errorMessage = 'Validation error occurred';
        }
        throw new CustomError({ message: errorMessage, code: 500, data: error.errors || error.message });
    }
}

export const getBankList = async (page, pageSize, query) => {
    const { name, accountNumber } = query;

    // Construir la consulta de filtrado
    const whereClause = {};

    if (name) {
        whereClause.name  = { [Op.iLike]: `%${name}%` };
    }
    if (accountNumber) {
        whereClause.account_number = { [Op.iLike]: `%${accountNumber}%` };
    }

    console.log('Where clause:', whereClause);

    try {
        const { count, rows } = await model.BankModel.findAndCountAll({
            where: whereClause,
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [
                ['createdAt', 'DESC'],
            ],
            include: [
                {
                    model: model.UserModel,
                    as: 'creator', // Especifica el alias de la asociación con el creador
                    attributes: ['name']
                },
                {
                    model: model.UserModel,
                    as: 'updater', // Especifica el alias de la asociación con el actualizador
                    attributes: ['name']
                }
            ]
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
        console.error('Error en getBankList:', e); // Imprime el error en la consola
        throw CustomError({
            message: `Error al intentar traer la lista de bancos`,
            code: 500,
            data: e.errors || e
        });
    }
};

export const updateBank = async (id, data) => {
    try{
        const [affectedRows, updatedRows] = await model.BankModel.update(data,{
            where: {id},
            returning: true
        });
        return {data:updatedRows[0], error:null, warning:null}
    } catch (e) {
        throw CustomError({message: `Error al actualizar el banco`, code:500, data:e.errors})
    }
}

export const getActiveBanks = async () => {
    try {
        const banks = await model.BankModel.findAll({
            where: {status: true}
        })
        return {data:banks, error:null, warning: null}
    }catch (e) {
        throw CustomError({message: `Error al traer el listado de bancos activos`, code:500, data:e.errors})
    }
}

