import Product from "../models/product.model.js";
import { AppError } from "./app.error.js";

export const listProducts = async () => await Product.find();

export const getProduct = async (id) => {
    const producto = await Product.findById(id);
    if (!producto) throw new AppError("Producto no encontrado", 404);
    return producto;
};

export const createProduct = async (data) => await Product.create(data);

export const updateProduct = async (id, data) => {
    const producto = await Product.findByIdAndUpdate(id, data, {
        returnDocument: "after", // devuelve el producto ya actualizado
        runValidators: true      // aplica las validaciones del esquema
    });
    if (!producto) throw new AppError("Producto no encontrado", 404);
    return producto;
};

export const deleteProduct = async (id) => {
    const producto = await Product.findByIdAndDelete(id);
    if (!producto) throw new AppError("Producto no encontrado", 404);
};

export const listByCategory = async (categoria) => await Product.find({ categoria });
