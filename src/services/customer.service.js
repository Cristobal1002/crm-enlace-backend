import {model} from "../models/main.model.js";
import {CustomError} from '../errors/main.error.js';

export const createCustomer = async (data) => {
    try {
        const customer = await model.CustomerModel.create(data);
        return { data: customer, error: null, warning: null };
    } catch (error) {
        console.error('Error creating campaign:', error);

        // Manejo de errores detallado
        let errorMessage = 'Error al crear la cliente';
        if (error.name === 'SequelizeValidationError') {
            errorMessage = 'Validation error occurred';
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            errorMessage = 'A campaign with this identifier already exists';
        }

        throw new CustomError({ message: errorMessage, code: 500, data: error.errors || error.message });
    }
}
