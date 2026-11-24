import mongoose from "mongoose";

const conectarBD = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/mi_proyecto_db";
        await mongoose.connect(mongoURI);
        console.log("Conexión exitosa a la base de datos MongoDB");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error.message);
        process.exit(1); // Detener la aplicación en caso de fallo crítico
    }
};

export default conectarBD;
