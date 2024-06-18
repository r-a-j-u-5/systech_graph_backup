import { Router } from "express";
import { Request, Response } from "express";
import axios from "axios";
import { CreateTenant } from "../../../controllers/operator/create/controllers";

const router = Router();

router.post("/createTenant", CreateTenant);

export default router;