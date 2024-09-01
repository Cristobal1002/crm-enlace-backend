import {model} from "../models/main.model.js";
import {CustomError} from '../errors/main.error.js';
import {Op} from "sequelize";

export const createCustomer = async (data) => {
    try {
        // Verificar si el número de documento ya existe
        const existingCustomer = await model.CustomerModel.findOne({
            where: { document: data.document }
        });

        if (existingCustomer) {
            // Retornar un error si se encuentra un cliente con el mismo número de documento
            return { data: null, warning: 'El número de documento ya existe', error: null };
        }

        // Proceder con la creación si no hay conflictos
        const customer = await model.CustomerModel.create(data);
        return { data: customer, error: null, warning: null };
    } catch (error) {
        console.error('Error creando el cliente:', error);

        // Manejo de errores detallado
        let errorMessage = 'Error al crear la cliente';
        if (error.name === 'SequelizeValidationError') {
            errorMessage = 'Validation error occurred';
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            errorMessage = 'ya existe un cliente';
        }

        throw new CustomError({ message: errorMessage, code: 500, data: error.errors || error.message });
    }
}
export const getCustomerList = async (page, pageSize, query) => {
    const { document, firstName, lastName, companyName, phone, email } = query

    // Construir la consulta de filtrado
    const whereClause = {};

    if (document) {
        whereClause.document = document;
    }
    if (firstName) {
        whereClause.first_name = { [Op.iLike]: `%${firstName}%` };
    }
    if (lastName) {
        whereClause.last_name = { [Op.iLike]: `%${lastName}%` };
    }
    if (companyName) {
        whereClause.company_name = { [Op.iLike]: `%${companyName}%` };
    }
    if (phone) {
        whereClause.phone = { [Op.iLike]: `%${phone}%` };
    }
    if (email) {
        whereClause.email = { [Op.iLike]: `%${email}%` };
    }

    console.log('Where clause:', whereClause, 'Query:', query.lastName)
    try{
        const { count, rows } = await model.CustomerModel.findAndCountAll({
            where: whereClause,
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [
                ['createdAt', 'DESC'], // Ordenar por fecha de creación de manera descendente
            ],include: [
                {
                    model: model.CityModel,
                    attributes: ['id','name','country_id', 'state_id', 'state_name'] // Incluir el nombre de la ciudad
                },
                {
                    model: model.CountryModel,
                    attributes: ['id','name', 'iso2','iso3', 'emoji'] // Incluir el nombre de la ciudad
                },
                {
                    model: model.StateModel,
                    attributes: ['id','name'] // Incluir el nombre de la ciudad
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
    } catch (e){
        console.error('Error en getCustomerList:', e); // Imprime el error en la consola
        throw CustomError({
            message: `Error al intentar traer la lista de clientes`,
            code: 500,
            data: e.errors || e
        });

    }
}

export const updateCustomer = async (id, data) => {
    try {
        // Verificar si el número de documento ya existe en otro cliente
        if (data.document) {
            console.log(`Verificando si el documento ${data.document} ya existe para otro cliente...`);
            const existingCustomer = await model.CustomerModel.findOne({
                where: { document: data.document, id: { [Op.ne]: id } } // Excluir el cliente actual
            });

            if (existingCustomer) {
                console.log('El número de documento ya existe:', existingCustomer);
                return { data: null, error: null, warning: 'El número de documento ya existe para otro cliente' };
            }
        }

        // Proceder con la actualización si no hay conflictos
        const [affectedRows, updatedRows] = await model.CustomerModel.update(data, {
            where: { id },
            returning: true
        });

        console.log('Cliente actualizado:', updatedRows[0]);
        return { data: affectedRows, error: null, warning: null };
    } catch (e) {
        console.error('Error al actualizar el cliente:', e);

        // Manejo más detallado de errores
        let errorMessage = 'Error al actualizar el cliente';
        if (e.name === 'SequelizeValidationError') {
            errorMessage = 'Error de validación ocurrido';
        } else if (e.name === 'SequelizeUniqueConstraintError') {
            errorMessage = 'Ya existe un cliente con el identificador proporcionado';
        }

        throw new CustomError({ message: errorMessage, code: 500, data: e.errors || e.message });
    }
};

export const getCustomerByDocument = async(document) => {
    console.log('document en get cust by document',document)
    try {
        const customer = await model.CustomerModel.findOne({
            where: {document},
            include: [
            {
                model: model.CityModel,
                attributes: ['id','name','country_id', 'state_id', 'state_name'] // Incluir el nombre de la ciudad
            },
            {
                model: model.CountryModel,
                attributes: ['id','name', 'iso2','iso3', 'emoji'] // Incluir el nombre de la ciudad
            },
            {
                model: model.StateModel,
                attributes: ['id','name'] // Incluir el nombre de la ciudad
            }
        ]
            }
        )
        if (customer){
            return {data: customer, error:null, warning:null}
        }else{
            return {
                data: null, warning: null, error:null
            }
        }

    } catch (e) {
        console.log(e)
        throw new CustomError({ message: 'Error al obtener el cliente', code: 500, data: e.errors || e.message });

    }
}

