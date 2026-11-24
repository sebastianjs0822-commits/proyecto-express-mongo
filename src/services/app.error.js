// Error de negocio con código HTTP sugerido. El service lo LANZA, el controller lo ATRAPA.
export class AppError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    }
}
