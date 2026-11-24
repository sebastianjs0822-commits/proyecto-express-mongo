import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    contrasena: { type: String, required: true, minlength: 6 },
    rol: { type: String, enum: ["dueno", "veterinario", "administrador"], default: "dueno" },
    fechaCreacion: { type: Date, default: Date.now }
});

export default mongoose.model("Usuario", UsuarioSchema);
