import { Router } from "express";
import { Request, Response } from "express";
import axios from "axios";
import {
  GetAdvisors,
  GetSentries,
  GetComponentData,
  GetTenants
} from "../../../controllers/operator/read/controllers";
import { GetHierarchyTenant } from "../../../controllers/operator/read/controllers";

const router = Router();

router.get("/getAdvisors", GetAdvisors);
router.get("/getTenants", GetTenants)
router.get("/getSentries", GetSentries);
router.get("/getComponentData", GetComponentData);
router.get("/getHierarchyTenant", GetHierarchyTenant)

export default router;