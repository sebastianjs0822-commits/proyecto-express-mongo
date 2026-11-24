import { appendLog } from "../models/log.model.js";

// Middleware global: registra fecha, método, URL, estado, tiempo y body
export const logger = (req, res, next) => {
    const inicio = Date.now();

    res.on("finish", () => {
        const fecha = new Date().toISOString();
        const ms = Date.now() - inicio;

        // Nunca se guarda la contraseña en el log
        const bodySeguro = { ...req.body };
        if (bodySeguro.contrasena) bodySeguro.contrasena = "***";

        const body = Object.keys(bodySeguro).length > 0
            ? ` | Body: ${JSON.stringify(bodySeguro)}`
            : "";

        const linea = `[${fecha}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms} ms)${body}`;

        console.log(linea);
        appendLog(linea).catch(() => console.error("No se pudo escribir el log"));
    });

    next();
};
