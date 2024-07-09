"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../../controllers/designer/create/controllers");
const router = (0, express_1.Router)();
router.post("/createComponentUI", controllers_1.CreateComponentUI);
router.post("/createComponentIOT", controllers_1.CreateComponentIOT);
exports.default = router;
