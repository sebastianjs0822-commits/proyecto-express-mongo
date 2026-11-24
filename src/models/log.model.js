import { appendFile, mkdir } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const CARPETA = path.join(path.dirname(fileURLToPath(import.meta.url)), "../data");
const ARCHIVO_LOG = path.join(CARPETA, "auditoria.log");

export const appendLog = async (linea) => {
    await mkdir(CARPETA, { recursive: true }); // crea src/data si no existe
    await appendFile(ARCHIVO_LOG, linea + "\n", "utf-8");
};
