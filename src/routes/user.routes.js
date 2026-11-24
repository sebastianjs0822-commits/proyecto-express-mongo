import { Router } from "express";
import * as controller from "../controllers/user.controller.js";
import { validarRegistro, validarLogin } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", controller.getAll);
router.post("/registro", validarRegistro, controller.register);
router.post("/login", validarLogin, controller.login);

export default router;
