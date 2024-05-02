import express from "express";
import { Request, Response } from "express";
import axios from "axios";
import { GenerateAuthorizationHeader } from "./utils/generateAuthorizationHeader";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
const app = express();
const port = 3000;

app.get("/", async (req: Request, res: Response) => {
  await axios
    .post(
      `${process.env.COMMAND_ENDPOINT}`,
      {
        command:
          "g.V().has('components','pkid',33).emit().repeat(out('manages'))",
      },
      {
        headers: {
          Authorization: GenerateAuthorizationHeader(
            `${process.env.USER}`,
            `${process.env.PWD}`
          ),
        },
      }
    )
    .then((result) => {
      console.log(result.data);
      res.send(result.data);
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
