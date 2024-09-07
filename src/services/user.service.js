import {model} from "../models/main.model.js";
import bcrypt from 'bcryptjs';
import {CustomError} from "../errors/main.error.js";
import {Op} from "sequelize";
import {infinity} from "../config/secrets.js";

export const login = async (data) => {
    const { user, password } = data;

    if (!user || !password) {
        return { warning: 'User and password are required', error: null };
    }

    try {
        const normalizedUser = user.trim().toLowerCase();

        const usr = await model.UserModel.findOne({ where: { document: normalizedUser } });
        if (!usr) {
            return { warning: 'Invalid credentials', error: null };
        }

        if (usr.status === false) {
            return { warning: 'Your account is inactive. Please contact support.', error: null };
        }

        const isPasswordValid = await bcrypt.compare(password, usr.password);
        if (!isPasswordValid) {
            return { warning: 'Invalid credentials', error: null };
        }

        const token = await jwt.getToken(usr);

        // Filtrar datos sensibles
        const { id, name, document, roll, status, createdAt, updatedAt } = usr;
        const userResponse = { id, name, document, roll, status, createdAt, updatedAt };

        return {
            data: { user: userResponse, token },
            error: null,
            warning: null
        };
    } catch (error) {
        console.error('Error in login:', error);
        throw new CustomError({ message: 'Internal server error', code: 500, data: error.data });
    }
};


export const createFirstUser = async (data) => {
    const key = data.key
    try {
        if(key === infinity.key){
            const password = data.document.toString()
            data.password = await bcrypt.hash(password,9);
            const register = await model.UserModel.create(data)
            return {data: register, error:null, warning:null}
        }else{
            return {data:null, error:'.|. Buen intento loca!', warning:null }
        }
    } catch (e){
        throw new CustomError ({message: `Error al crear el usuario`, code:500, data: e.errors})
    }
}

export const updateUser = async (id, data) => {
    console.log('Data en el servicio',id, data)
    const currentUser = await model.UserModel.findByPk(id)
    if(currentUser.dataValues.roll === 'infinity'){
        return {data: null, warning:'Imposible actualizar un usuario de alto nivel'}
    }
    try{
        const [affectedRows, updatedRows] = await model.UserModel.update(data,{
            where: {id},
            returning: true
        });
        return {data:affectedRows, error:null, warning:null}
    } catch (e) {
        throw new CustomError({message: `Error al actualizar el usuario`, code:500, data:e.errors})
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
