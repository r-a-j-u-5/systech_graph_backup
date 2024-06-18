import { Router } from "express";
import { Request, Response } from "express";
import axios from "axios";
import { CreateComponentUI,CreateComponentIOT } from "../../../controllers/designer/create/controllers";

const router = Router();

router.post("/createComponentUI", CreateComponentUI);
router.post("/createComponentIOT", CreateComponentIOT);

export default router;