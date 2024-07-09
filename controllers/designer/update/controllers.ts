import { Request, Response } from "express";
import axios from "axios";
import { GenerateAuthorizationHeader } from "../../../utils/generateAuthorizationHeader";
import dotenv from "dotenv";
import { ComponentUpdation } from "../../../validators/validators";
import { components_integer_fields } from "../../../resources/vertex_data";
dotenv.config();

export const UpdateComponentUI = async (req: Request, res: Response) => {
  try {
    try {
      ComponentUpdation.parse(req.body);
    } catch (err) {
      return res.status(403).json({ msg: "Invalid Data!" });
    }
    const data = req.body;
    const fields_not_included = ["children","removechildren","componentid"];
    const maincomponentid = data.componentid
    let command = `g.V().hasId('${maincomponentid}')`;
    for (let [key, value] of Object.entries(data)) {
      if (!(key in fields_not_included))
        if (!(key in components_integer_fields))
          command += `.property('${key}','${value}')`;
        else command += `.property('${key}',${value})`;
    }
    const authHeader = await GenerateAuthorizationHeader(
      `${process.env.ORIENTDB_USERNAME}`,
      `${process.env.ORIENTDB_PASSWORD}`
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
        return res.status(401).json({ msg: "Cannot Update UI Component!" });
      });

    for (let i = 0; i < data?.children?.length; i++) {
      let command = `g.V().hasId('${maincomponentid}').as('a').V().hasId('${data?.children[i]}').as('b').addE('contains').from('a').to('b')`;
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
            .json({ msg: "Cannot add new children components!" });
        });
    }

    for (let i = 0; i < data?.removechildren?.length; i++) {
      let command = `g.V().hasId('${maincomponentid}').outE('contains').where(inV().hasId('${data?.removechildren[i]}')).drop()
      `;
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
            .json({ msg: "Cannot delink child node fro  main node!" });
        });
    }
    return res.status(200).json({ msg: "UI Component Updated Successfully!" });
  } catch (err) {
    return res.status(400).json({ msg: "Cannot Update UI Component!" });
  }
};