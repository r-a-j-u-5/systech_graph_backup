import { Request, Response } from "express";
import axios from "axios";
import { GenerateAuthorizationHeader } from "../../../utils/generateAuthorizationHeader";
import dotenv from "dotenv";
import { VertexId } from "../../../validators/validators";
dotenv.config();

export const GetAdvisors = async (req: Request, res: Response) => {
  try {
    const authHeader = await GenerateAuthorizationHeader(
      `${process.env.ORIENTDB_USERNAME}`,
      `${process.env.ORIENTDB_PASSWORD}`
    );
    const result = await axios.post(
      `${process.env.COMMAND_ENDPOINT}`,
      {
        command: "g.V().has('components','uniobjecttypeid',508)",
      },
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    res.status(200).json({
      msg: "Fetched Advisors successfully!",
      data: result.data.result,
    });
  } catch (err) {
    res.status(400).json({ msg: "Cannot Fetch Advisors!" });
  }
};

export const GetSentries = async (req: Request, res: Response) => {
  try {
    const authHeader = await GenerateAuthorizationHeader(
      `${process.env.ORIENTDB_USERNAME}`,
      `${process.env.ORIENTDB_PASSWORD}`
    );
    await axios
      .post(
        `${process.env.COMMAND_ENDPOINT}`,
        {
          command: "g.V().has('components','uniobjecttypeid',509)",
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
      .then((result) => {
        res.status(200).json({
          msg: "Fetched Sentries successfully!",
          data: result.data.result,
        });
      });
  } catch (err) {
    res.status(400).json({ msg: "Cannot Fetch Sentries!" });
  }
};

export const GetTenants = async (req: Request, res: Response) => {
  try {
    const authHeader = await GenerateAuthorizationHeader(
      `${process.env.ORIENTDB_USERNAME}`,
      `${process.env.ORIENTDB_PASSWORD}`
    );
    const result = await axios.post(
      `${process.env.COMMAND_ENDPOINT}`,
      {
        command: "g.V().hasLabel('tenants')",
      },
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    res.status(200).json({
      msg: "Fetched Tenants successfully!",
      data: result.data.result,
    });
  } catch (err) {
    res.status(400).json({ msg: "Cannot Fetch Tenants!" });
  }
};

export const GetComponentData = async (req: Request, res : Response) => {
  try {
    try {
      VertexId.parse(req.query.componentid);
    } catch (err) {
      return res.status(403).json({ msg: "Invalid Data!" });
    }
    const componentid = req.query.componentid;
    const authHeader = await GenerateAuthorizationHeader(
      `${process.env.ORIENTDB_USERNAME}`,
      `${process.env.ORIENTDB_PASSWORD}`
    );
    let root : any = {}
    let nodes: any = []
    try {
    root = await axios
      .post(
        `${process.env.COMMAND_ENDPOINT}`,
        {
          command: `g.V().hasId('${componentid}')`,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
    }
      catch(err) {
        return res.status(400).json({ msg: "Cannot Fetch Component from DB!" })
      }
      try {
    nodes = await axios
      .post(
        `${process.env.COMMAND_ENDPOINT}`,
        {
          command: `g.V().hasId('${componentid}').out('data_packet')`,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
    }
      catch(err) {
        return res.status(401).json({ msg: "Cannot Fetch ComponentData from DB!" })
      }
    root = root.data.result[0];
    nodes = nodes.data.result;
    
    root["data_nodes"] = nodes

    return res.status(200).json({
      msg: "ComponentData fetched successfully!",
      data: root,
    });
  } catch (err) {
    return res.status(401).json("Cannot fetch Component Data!");
  }
}

export const GetHierarchyTenant = async (req: Request, res: Response) => {
  try {
    try {
      VertexId.parse(req.query.tenantid);
    } catch (err) {
      return res.status(403).json({ msg: "Invalid Data!" });
    }
    const tenantid = req.query.tenantid;
    const authHeader = await GenerateAuthorizationHeader(
      `${process.env.ORIENTDB_USERNAME}`,
      `${process.env.ORIENTDB_PASSWORD}`
    );
    let tree : any = {}
    let nodes: any = []
    try {
    tree = await axios
      .post(
        `${process.env.COMMAND_ENDPOINT}`,
        {
          command: `g.V().hasId('${tenantid}').emit().repeat(out('contains')).store('x').emit().repeat(out('manages')).tree()`,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
    }
      catch(err) {
        return res.status(400).json({ msg: "Cannot Fetch Components from DB!" })
      }
      try {
    nodes = await axios
      .post(
        `${process.env.COMMAND_ENDPOINT}`,
        {
          command: `g.V().hasId('${tenantid}').emit().repeat(out('contains')).store('x').emit().repeat(out('manages'))`,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
    }
      catch(err) {
        return res.status(400).json({ msg: "Cannot Fetch Components from DB!" })
      }
    tree = tree.data.result[0];
    nodes = nodes.data.result;
    
    const findNodeByRid = (rid: string) => {
      return nodes.find((node: any) => node["@rid"] === rid);
    };

    // Recursive function to build the nested object
    const buildNestedObject = (tree: any) => {
      const result = [];

      for (const key in tree) {
        //@ts-ignore
        const rid = key.match(/v\[(.*)\]/)[1]; // Extract @rid from the key
        const node = findNodeByRid(rid);
        if (node) {
          const newNode = { ...node, children: [] };
          newNode.children = buildNestedObject(tree[key]); // Recursively build children
          //@ts-ignore
          result.push(newNode);
        }
      }
      return result;
    };

    // // Build the nested object starting from the root of the hierarchy
    const nestedObject = buildNestedObject(tree);

    return res.status(200).json({
      msg: "Hierarchy fetched successfully!",
      data: nestedObject,
    });
  } catch (err) {
    return res.status(401).json("Cannot fetch Hierarchy");
  }
};


