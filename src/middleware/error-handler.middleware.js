import {NewCustomError} from '../errors/custom.error.js';

export const errorHandler = async (err, _, res, next) => {
    if (!err) return next();
    if (err instanceof NewCustomError) {
        return res.status(err.code).send({ ...err.serialize() });
    }

    return res.status(500).send({
        error: err.message,
        data: null,
        code: 500,
    });
};