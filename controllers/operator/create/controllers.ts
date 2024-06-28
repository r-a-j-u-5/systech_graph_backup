import { Request, Response } from "express";
import axios from "axios";
import { GenerateAuthorizationHeader } from "../../../utils/generateAuthorizationHeader";
import dotenv from "dotenv";
import { TenantCreation } from "../../../validators/validators";
import { tenants_integer_fields } from "../../../resources/vertex_data";
dotenv.config();

export const CreateTenant = async (req: Request, res: Response) => {
  try {
    try {
      TenantCreation.parse(req.body);
    } catch (err) {
      return res.status(403).json({ msg: "Invalid Data!" });
    }
    const data = req.body;
    const fields_not_included = ["children"];
    let command = "g.addV('tenants')";
    for (let [key, value] of Object.entries(data)) {
      if (!(key in fields_not_included)) {
        if (!(key in tenants_integer_fields))
          command += `.property('${key}','${value}')`;
        else command += `.property('${key}',${value})`;
      }
    }
    const authHeader = await GenerateAuthorizationHeader(
      `${process.env.USERNAME}`,
      `${process.env.PASSWORD}`
    );
    const result: any = await axios
      .post(
        `${process.env.COMMAND_ENDPOINT}`,
        {
          command: command,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
      .catch((err) => {
        return res.status(401).json({ msg: "Cannot create Vertex!" });
      });
    const componentid = result?.data?.result[0]["@rid"];
    for (let i = 0; i < data.children.length; i++) {
      let command = `g.V().hasId('${componentid}').as('a').V().hasId('${data.children[i]}').as('b').addE('contains').from('a').to('b')`;
      await axios
        .post(
          `${process.env.COMMAND_ENDPOINT}`,
          {
            command: command,
          },
          {
            headers: {
              Authorization: authHeader,
            },
          }
        )
        .catch((err) => {
          res
            .status(402)
            .json({ msg: "Cannot create edge between tenant and scene!" });
        });
    }
    return res.status(200).json({ msg: "Tenant Created Successfully!" });
  } catch (err) {
    return res.status(400).json({ msg: "Cannot Create Tenant!" });
  }
};