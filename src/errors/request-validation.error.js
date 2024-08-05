import { NewCustomError } from './custom.error.js';

class NewRequestValidationError extends NewCustomError {
    statusCode = 400;

    constructor(errors) {
        super({ message: "Existen parámetros no validos en la petición." });

        this.errors = errors;

        Object.setPrototypeOf(this, NewRequestValidationError.prototype);
    }

    serialize() {
        // todo modificar en este punto para devolver el primer error
        const message =
            Array.isArray(this.errors) && this.errors.length > 0
                ? this.errors[0]?.msg
                : "Ocurrió un error en la validación de datos";
        return {
            code: this.statusCode,
            //message: 'Lista de parámetros que no pasaron la validación.',
            message,
            error: this.errors.map((x) => {
                console.log(x);
                return {
                    message: x.msg,
                    field: x.path,
                    location: x.location,
                    value: x.value,
                };
            }),
        };
    }
}

export const RequestValidationError = (errors) => {
    return new NewRequestValidationError(errors);
};
