import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getStatistics = async () => {
    const totalProductos = await Product.countDocuments();
    const totalUsuarios = await User.countDocuments();

    // Agrupa por categoría: cantidad, stock total y valor del inventario
    const porCategoria = await Product.aggregate([
        {
            $group: {
                _id: "$categoria",
                cantidad: { $sum: 1 },
                stockTotal: { $sum: "$stock" },
                valorInventario: { $sum: { $multiply: ["$precio", "$stock"] } }
            }
        },
        { $sort: { cantidad: -1 } }
    ]);

    return { totalProductos, totalUsuarios, porCategoria };
};
