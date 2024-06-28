import { Router } from "express";
import { Request, Response } from "express";
import axios from "axios";
import {
  UpdateComponentUI,
} from "../../../controllers/designer/update/controllers";

const router = Router();

router.post("/updateComponentUI", UpdateComponentUI);

export default router;