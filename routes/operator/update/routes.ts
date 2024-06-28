import { Router } from "express";
import { Request, Response } from "express";
import axios from "axios";
import {
  UpdateComponentIOT
} from "../../../controllers/operator/update/controllers";

const router = Router();

router.post("/updateComponentIOT", UpdateComponentIOT);

export default router;