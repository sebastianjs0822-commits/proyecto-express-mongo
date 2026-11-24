import { Router } from "express";
import * as controller from "../controllers/product.controller.js";
import { validarId, validarProductoCrear, validarProductoActualizar } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", controller.getAll);
// Va antes de "/:id" para que Express no confunda "categoria" con un id
router.get("/categoria/:cat", controller.getByCategory);
router.get("/:id", validarId, controller.getById);
router.post("/", validarProductoCrear, controller.create);
router.put("/:id", validarId, validarProductoActualizar, controller.update);
router.delete("/:id", validarId, controller.remove);

export default router;
