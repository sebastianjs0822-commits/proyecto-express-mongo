export const notFound = (req, res) => {
    res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
};

// JSON mal formado u otros errores que escapen de las rutas
export const manejarErrores = (err, req, res, next) => {
    if (err.type === "entity.parse.failed")
        return res.status(400).json({ error: "El JSON enviado no es válido" });
    res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
};
