"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../../controllers/operator/create/controllers");
const router = (0, express_1.Router)();
router.post("/createTenant", controllers_1.CreateTenant);
exports.default = router;
