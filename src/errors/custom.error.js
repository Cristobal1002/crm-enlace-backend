export class NewCustomError extends Error {
    constructor({ message, code, data }) {
        super(message);
        this.message = message || "Ocurrió un error desconocido";
        this.code = code || 400;
        this.data = data || {};
        Object.setPrototypeOf(this, NewCustomError.prototype);
    }

    serialize() {
        return {
            code: this.code,
            message: this.message,
            error: this.data,
        };
    }
}

// Si necesitas que se importe como `CustomError` desde otros archivos
export const CustomError = NewCustomError;
