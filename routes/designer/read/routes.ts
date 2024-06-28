import { Router } from "express";
import { Request, Response } from "express";
import axios from "axios";
import {
  GetHierarchy,
  GetHierarchyIOT,
  GetHierarchyUI,
  GetEnvironments,
  GetGuardianServers,
  GetScenes,
  GetSites,
  GetOrganizations,
  GetComponentDetailsWithChildren
} from "../../../controllers/designer/read/controllers";
import { GetComponentById } from "../../../controllers/designer/read/controllers";

const router = Router();

router.get("/getHierarchy", GetHierarchy)
router.get("/getHierarchyIOT", GetHierarchyIOT);
router.get("/getHierarchyUI", GetHierarchyUI)
router.get("/getEnvironments", GetEnvironments);
router.get("/getGuardianServers", GetGuardianServers);
router.get("/getSites", GetSites);
router.get("/getOrganizations", GetOrganizations);
router.get("/getScenes", GetScenes);
router.get("/getComponentById", GetComponentById)
router.get("/getComponentDetailsWithChildren", GetComponentDetailsWithChildren)

export default router;