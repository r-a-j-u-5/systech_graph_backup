import express from "express";
import { Request, Response } from "express";
import axios from "axios";
import { GenerateAuthorizationHeader } from "./utils/generateAuthorizationHeader";
import dotenv from "dotenv";
import logger from "pino";
dotenv.config({ path: __dirname + "/.env" });
const app = express();
const port = 5000;
import ReadRoutesDesigner from "./routes/designer/read/routes";
import CreateRoutesDesigner from "./routes/designer/create/routes";
import ReadRoutesOperator from "./routes/operator/read/routes"
import CreateRoutesOperator from "./routes/operator/create/routes"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", ReadRoutesDesigner);
app.use("/", CreateRoutesDesigner);
app.use("/",ReadRoutesOperator)
app.use("/", CreateRoutesOperator)

app.listen(port, () => console.log(`Server running on port ${port}`));