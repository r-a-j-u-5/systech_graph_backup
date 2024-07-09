import { Request, Response } from "express";
import axios from "axios";
import { GenerateAuthorizationHeader } from "../../../utils/generateAuthorizationHeader";
import dotenv from "dotenv";
import { VertexId } from "../../../validators/validators";
dotenv.config();

export const GetHierarchy = async (req: Request, res: Response) => {
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
    let tree : any = {}
    let nodes: any = []
    try {
    tree = await axios
      .post(
        `${process.env.COMMAND_ENDPOINT}`,
        {
          command: `g.V().hasId('${componentid}').emit().repeat(out('contains')).store('x').emit().repeat(out('manages')).tree()`,
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
          command: `g.V().hasId('${componentid}').emit().repeat(out('contains')).store('x').emit().repeat(out('manages'))`,
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

export const GetHierarchyIOT = async (req: Request, res: Response) => {
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
    let tree : any = {}
    let nodes: any = []
    try {
    tree = await axios
      .post(
        `${process.env.COMMAND_ENDPOINT}`,
        {
          command: `g.V().hasId('${componentid}').emit().repeat(out('manages')).tree()`,
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
          command: `g.V().hasId('${componentid}').emit().repeat(out('manages'))`,
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

export const GetHierarchyUI = async (req: Request, res: Response) => {
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
    let tree : any = {}
    let nodes: any = []
    try {
    tree = await axios
      .post(
        `${process.env.COMMAND_ENDPOINT}`,
        {
          command: `g.V().hasId('${componentid}').emit().repeat(out('contains')).tree()`,
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
          command: `g.V().hasId('${componentid}').emit().repeat(out('contains'))`,
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

export const GetEnvironments = async (req: Request, res: Response) => {
  try {
    const authHeader = await GenerateAuthorizationHeader(
      `${process.env.ORIENTDB_USERNAME}`,
      `${process.env.ORIENTDB_PASSWORD}`
    );
    const result = await axios.post(
      `${process.env.COMMAND_ENDPOINT}`,
      {
        command: "g.V().has('components','uniobjecttypeid',504)",
      },
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    res.status(200).json({
      msg: "Fetched Environments successfully!",
      data: result.data.result,
    });
  } catch (err) {
    res.status(400).json({ msg: "Cannot Fetch Environments!" });
  }
};

export const GetGuardianServers = async (req: Request, res: Response) => {
  try {
    const authHeader = await GenerateAuthorizationHeader(
      `${process.env.ORIENTDB_USERNAME}`,
      `${process.env.ORIENTDB_PASSWORD}`
    );
    await axios
      .post(
        `${process.env.COMMAND_ENDPOINT}`,
        {
          command: "g.V().has('components','uniobjecttypeid',506)",
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
      .then((result) => {
        res.status(200).json({
          msg: "Fetched GuardianServers successfully!",
          data: result.data.result,
        });
      });
  } catch (err) {
    res.status(400).json({ msg: "Cannot Fetch GuardianServers!" });
  }
};

export const GetSites = async (req: Request, res: Response) => {
  try {
    const authHeader = await GenerateAuthorizationHeader(
      `${process.env.ORIENTDB_USERNAME}`,
      `${process.env.ORIENTDB_PASSWORD}`
    );
    await axios
      .post(
        `${process.env.COMMAND_ENDPOINT}`,
        {
          command: "g.V().has('components','uniobjecttypeid',503)",
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
      .then((result) => {
        res.status(200).json({
          msg: "Fetched Sites successfully!",
          data: result.data.result,
        });
      });
  } catch (err) {
    res.status(400).json({ msg: "Cannot Fetch Sites!" });
  }
};

export const GetOrganizations = async (req: Request, res: Response) => {
  try {
    const authHeader = await GenerateAuthorizationHeader(
      `${process.env.ORIENTDB_USERNAME}`,
      `${process.env.ORIENTDB_PASSWORD}`
    );
    await axios
      .post(
        `${process.env.COMMAND_ENDPOINT}`,
        {
          command: "g.V().has('components','uniobjecttypeid',502)",
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
      .then((result) => {
        res.status(200).json({
          msg: "Fetched Organizations successfully!",
          data: result.data.result,
        });
      });
  } catch (err) {
    res.status(400).json({ msg: "Cannot Fetch Organizations!" });
  }
};

export const GetScenes = async (req: Request, res: Response) => {
  try {
    const authHeader = await GenerateAuthorizationHeader(
      `${process.env.ORIENTDB_USERNAME}`,
      `${process.env.ORIENTDB_PASSWORD}`
    );
    await axios
      .post(
        `${process.env.COMMAND_ENDPOINT}`,
        {
          command: "g.V().has('components','uniobjecttypeid',501)",
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
      .then((result) => {
        res.status(200).json({
          msg: "Fetched Scenes successfully!",
          data: result.data.result,
        });
      });
  } catch (err) {
    res.status(400).json({ msg: "Cannot Fetch Scenes!" });
  }
};

export const GetComponentById = async (req : Request, res : Response) => {
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
    await axios
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
      .then((result) => {
        res.status(200).json({
          msg: "Fetched Component Details successfully!",
          data: result.data.result[0],
        });
      });
  } catch (err) {
    res.status(400).json({ msg: "Cannot Fetch Component Details!" });
  }
}

export const GetComponentDetailsWithChildren = async (req: Request, res : Response) => {
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
          command: `g.V().hasId('${componentid}').out('contains')`,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
    }
      catch(err) {
        return res.status(402).json({ msg: "Cannot Fetch Component Children from DB!" })
      }
    root = root.data.result[0];
    nodes = nodes.data.result;
    
    root["children"] = nodes

    return res.status(200).json({
      msg: "Component Details and its Children fetched successfully!",
      data: root,
    });
  } catch (err) {
    return res.status(401).json("Cannot fetch Component Details and its Children!");
  }
}