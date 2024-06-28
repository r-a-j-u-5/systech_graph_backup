"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../../controllers/designer/update/controllers");
const router = (0, express_1.Router)();
router.post("/updateComponentUI", controllers_1.UpdateComponentUI);
exports.default = router;
