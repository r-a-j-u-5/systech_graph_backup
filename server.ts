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
import UpdateRoutesDesigner from "./routes/designer/update/routes"
import ReadRoutesOperator from "./routes/operator/read/routes"
import CreateRoutesOperator from "./routes/operator/create/routes"
import UpdateRoutesOperator from "./routes/operator/update/routes"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// designer routes
app.use("/Systech360/rest/designer", ReadRoutesDesigner);
app.use("/Systech360/rest/designer", CreateRoutesDesigner);
app.use("/Systech360/rest/designer", UpdateRoutesDesigner)

// operator routes
app.use("/Systech360/rest/operator",ReadRoutesOperator)
app.use("/Systech360/rest/operator", CreateRoutesOperator)
app.use("/Systech360/rest/operator", UpdateRoutesOperator)


app.listen(port, () => console.log(`Server running on port ${port}`));