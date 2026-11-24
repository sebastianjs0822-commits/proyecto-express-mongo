import { Router } from "express";
import * as controller from "../controllers/report.controller.js";

const router = Router();

router.get("/estadisticas", controller.statistics);

export default router;
