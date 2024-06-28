"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../../controllers/operator/update/controllers");
const router = (0, express_1.Router)();
router.post("/updateComponentIOT", controllers_1.UpdateComponentIOT);
exports.default = router;
