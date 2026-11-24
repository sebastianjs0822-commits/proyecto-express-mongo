import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { AppError } from "./app.error.js";

export const registerUser = async ({ nombre, email, contrasena, rol }) => {
    const existe = await User.findOne({ email });
    if (existe) throw new AppError("Ese email ya está registrado", 409);

    // La contraseña se guarda encriptada, nunca en texto plano
    const hash = await bcrypt.hash(contrasena, 10);
    const usuario = await User.create({ nombre, email, contrasena: hash, rol });

    return { id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol };
};

export const loginUser = async ({ email, contrasena }) => {
    const usuario = await User.findOne({ email });
    if (!usuario) throw new AppError("Credenciales incorrectas", 401);

    const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!coincide) throw new AppError("Credenciales incorrectas", 401);

    const token = jwt.sign(
        { id: usuario._id, rol: usuario.rol },
        process.env.JWT_SECRET || "clave_secreta_taller",
        { expiresIn: "1h" }
    );

    return { token, usuario: { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol } };
};

export const listUsers = async () => await User.find().select("-contrasena"); // sin contraseña
