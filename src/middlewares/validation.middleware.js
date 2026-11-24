import mongoose from "mongoose";

// Validaciones de FORMA (tipos, obligatoriedad). Las reglas de negocio
// (email duplicado, credenciales, existencia) siguen en los services.

const esTexto = (v) => typeof v === "string" && v.trim() !== "";
const esEmail = (v) => typeof v === "string" && /^\S+@\S+\.\S+$/.test(v);

// Cada regla: [validador, mensaje, obligatorioEnPOST]
const reglasProducto = {
    nombre: [esTexto, "El nombre es obligatorio y debe ser texto", true],
    precio: [(v) => typeof v === "number" && v >= 0, "El precio debe ser un número mayor o igual a 0", true],
    categoria: [esTexto, "La categoría es obligatoria y debe ser texto", true],
    stock: [(v) => Number.isInteger(v) && v >= 0, "El stock debe ser un entero mayor o igual a 0", false]
};

const reglasRegistro = {
    nombre: [esTexto, "El nombre es obligatorio y debe ser texto", true],
    email: [esEmail, "El email es obligatorio y debe tener formato válido", true],
    contrasena: [(v) => typeof v === "string" && v.length >= 6, "La contraseña debe tener mínimo 6 caracteres", true],
    rol: [(v) => ["dueno", "veterinario", "administrador"].includes(v), "El rol debe ser 'dueno', 'veterinario' o 'administrador'", false]
};

const reglasLogin = {
    email: [esEmail, "El email es obligatorio y debe tener formato válido", true],
    contrasena: [esTexto, "La contraseña es obligatoria", true]
};

// parcial = true (PUT): solo valida los campos que lleguen
const crearValidador = (reglas, parcial) => (req, res, next) => {
    const body = req.body || {};

    if (Object.keys(body).length === 0)
        return res.status(400).json({ error: "El cuerpo de la petición no puede estar vacío" });

    for (const [campo, [valido, mensaje, obligatorio]] of Object.entries(reglas)) {
        const presente = body[campo] !== undefined;
        if (!presente && (parcial || !obligatorio)) continue;
        if (!valido(body[campo])) return res.status(400).json({ error: mensaje });
    }

    next();
};

export const validarProductoCrear = crearValidador(reglasProducto, false);
export const validarProductoActualizar = crearValidador(reglasProducto, true);
export const validarRegistro = crearValidador(reglasRegistro, false);
export const validarLogin = crearValidador(reglasLogin, false);

// Valida que :id tenga formato de ObjectId de MongoDB
export const validarId = (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).json({ error: "El id no tiene un formato válido" });
    next();
};
