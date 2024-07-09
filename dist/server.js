"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + "/.env" });
const app = (0, express_1.default)();
const port = 5000;
const routes_1 = __importDefault(require("./routes/designer/read/routes"));
const routes_2 = __importDefault(require("./routes/designer/create/routes"));
const routes_3 = __importDefault(require("./routes/designer/update/routes"));
const routes_4 = __importDefault(require("./routes/operator/read/routes"));
const routes_5 = __importDefault(require("./routes/operator/create/routes"));
const routes_6 = __importDefault(require("./routes/operator/update/routes"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// designer routes
app.use("/Systech360/rest/designer", routes_1.default);
app.use("/Systech360/rest/designer", routes_2.default);
app.use("/Systech360/rest/designer", routes_3.default);
// operator routes
app.use("/Systech360/rest/operator", routes_4.default);
app.use("/Systech360/rest/operator", routes_5.default);
app.use("/Systech360/rest/operator", routes_6.default);
app.listen(port, () => console.log(`Server running on port ${port}`));
