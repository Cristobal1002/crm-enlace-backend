import {model} from "../models/main.model.js";
import bcrypt from 'bcryptjs';
import {CustomError} from "../errors/main.error.js";
import {jwt} from "../utils/main.util.js";
import {Op} from "sequelize";

export const createUser = async (data) => {
    try {
        const password = data.document.toString()
        data.password = await bcrypt.hash(password,9);
        const register = await model.UserModel.create(data)
        return {data: register, error:null, warning:null}
    } catch (e){
        throw  CustomError ({message: `Error al crear el usuario`, code:500, data: e.errors})
    }
}

export const updateUser = async (id, data) => {
    console.log('Data en el servicio',id, data)
    try{
        const update = await model.UserModel.update(data,{
            where: {id}
        });
        return {data:update, error:null, warning:null}
    } catch (e) {
        throw CustomError({message: `Error al actualizar el usuario`, code:500, data:e.errors})
    }
}

export const getUsersList = async (page, pageSize, query) => {

    const { status, name, email, document } = query
    // Construir la consulta de filtrado
    const whereClause = {};

    if (status) {whereClause.status = status}
    if (name) {whereClause.name = { [Op.iLike]: `%${name}%` }}
    if (email) {whereClause.email = { [Op.iLike]: `%${email}%` }}
    if (document) {whereClause.document = document }

    try {
        const { count, rows } = await model.UserModel.findAndCountAll({
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
        throw CustomError({message: `Error al intentar traer la lista de usuarios`, code:500, data:e.errors})
    }
}
