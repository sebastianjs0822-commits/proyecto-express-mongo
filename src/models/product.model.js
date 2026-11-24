import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    precio: { type: Number, required: true, min: 0 },
    categoria: { type: String, required: true },
    stock: { type: Number, default: 0 },
    fechaCreacion: { type: Date, default: Date.now }
});

export default mongoose.model("Producto", ProductoSchema);
