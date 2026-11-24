import "dotenv/config";
import express from "express";
import cors from "cors";
import conectarBD from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import reportRoutes from "./routes/report.routes.js";
import { logger } from "./middlewares/logger.middleware.js";
import { notFound, manejarErrores } from "./middlewares/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

conectarBD();

app.use(cors());
app.use(express.json());
app.use(logger); // global: antes de las rutas

app.use("/api/productos", productRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/reportes", reportRoutes);

app.use(notFound);
app.use(manejarErrores);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
