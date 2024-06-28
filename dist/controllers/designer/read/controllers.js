"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetScenes = exports.GetOrganizations = exports.GetSites = exports.GetGuardianServers = exports.GetEnvironments = exports.GetHierarchyUI = exports.GetHierarchyIOT = exports.GetHierarchy = void 0;
const axios_1 = __importDefault(require("axios"));
const generateAuthorizationHeader_1 = require("../../../utils/generateAuthorizationHeader");
const dotenv_1 = __importDefault(require("dotenv"));
const validators_1 = require("../../../validators/validators");
dotenv_1.default.config();
const GetHierarchy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
            validators_1.VertexId.parse(req.query.componentid);
        }
        catch (err) {
            return res.status(403).json({ msg: "Invalid Data!" });
        }
        const componentid = req.query.componentid;
        const authHeader = yield (0, generateAuthorizationHeader_1.GenerateAuthorizationHeader)(`${process.env.USERNAMENAME}`, `${process.env.PASSWORD}`);
        let tree = {};
        let nodes = [];
        try {
            tree = yield axios_1.default
                .post(`${process.env.COMMAND_ENDPOINT}`, {
                command: `g.V().hasId('${componentid}').emit().repeat(out('contains')).store('x').emit().repeat(out('manages')).tree()`,
            }, {
                headers: {
                    Authorization: authHeader,
                },
            });
        }
        catch (err) {
            return res.status(400).json({ msg: "Cannot Fetch Components from DB!" });
        }
        try {
            nodes = yield axios_1.default
                .post(`${process.env.COMMAND_ENDPOINT}`, {
                command: `g.V().hasId('${componentid}').emit().repeat(out('contains')).store('x').emit().repeat(out('manages'))`,
            }, {
                headers: {
                    Authorization: authHeader,
                },
            });
        }
        catch (err) {
            return res.status(400).json({ msg: "Cannot Fetch Components from DB!" });
        }
        tree = tree.data.result[0];
        nodes = nodes.data.result;
        const findNodeByRid = (rid) => {
            return nodes.find((node) => node["@rid"] === rid);
        };
        // Recursive function to build the nested object
        const buildNestedObject = (tree) => {
            const result = [];
            for (const key in tree) {
                //@ts-ignore
                const rid = key.match(/v\[(.*)\]/)[1]; // Extract @rid from the key
                const node = findNodeByRid(rid);
                if (node) {
                    const newNode = Object.assign(Object.assign({}, node), { children: [] });
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
    }
    catch (err) {
        return res.status(401).json("Cannot fetch Hierarchy");
    }
});
exports.GetHierarchy = GetHierarchy;
const GetHierarchyIOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
            validators_1.VertexId.parse(req.query.componentid);
        }
        catch (err) {
            return res.status(403).json({ msg: "Invalid Data!" });
        }
        const componentid = req.query.componentid;
        const authHeader = yield (0, generateAuthorizationHeader_1.GenerateAuthorizationHeader)(`${process.env.USERNAMENAME}`, `${process.env.PASSWORD}`);
        let tree = {};
        let nodes = [];
        try {
            tree = yield axios_1.default
                .post(`${process.env.COMMAND_ENDPOINT}`, {
                command: `g.V().hasId('${componentid}').emit().repeat(out('manages')).tree()`,
            }, {
                headers: {
                    Authorization: authHeader,
                },
            });
        }
        catch (err) {
            return res.status(400).json({ msg: "Cannot Fetch Components from DB!" });
        }
        try {
            nodes = yield axios_1.default
                .post(`${process.env.COMMAND_ENDPOINT}`, {
                command: `g.V().hasId('${componentid}').emit().repeat(out('manages'))`,
            }, {
                headers: {
                    Authorization: authHeader,
                },
            });
        }
        catch (err) {
            return res.status(400).json({ msg: "Cannot Fetch Components from DB!" });
        }
        tree = tree.data.result[0];
        nodes = nodes.data.result;
        const findNodeByRid = (rid) => {
            return nodes.find((node) => node["@rid"] === rid);
        };
        // Recursive function to build the nested object
        const buildNestedObject = (tree) => {
            const result = [];
            for (const key in tree) {
                //@ts-ignore
                const rid = key.match(/v\[(.*)\]/)[1]; // Extract @rid from the key
                const node = findNodeByRid(rid);
                if (node) {
                    const newNode = Object.assign(Object.assign({}, node), { children: [] });
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
    }
    catch (err) {
        return res.status(401).json("Cannot fetch Hierarchy");
    }
});
exports.GetHierarchyIOT = GetHierarchyIOT;
const GetHierarchyUI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
            validators_1.VertexId.parse(req.query.componentid);
        }
        catch (err) {
            return res.status(403).json({ msg: "Invalid Data!" });
        }
        const componentid = req.query.componentid;
        const authHeader = yield (0, generateAuthorizationHeader_1.GenerateAuthorizationHeader)(`${process.env.USERNAMENAME}`, `${process.env.PASSWORD}`);
        let tree = {};
        let nodes = [];
        try {
            tree = yield axios_1.default
                .post(`${process.env.COMMAND_ENDPOINT}`, {
                command: `g.V().hasId('${componentid}').emit().repeat(out('contains')).tree()`,
            }, {
                headers: {
                    Authorization: authHeader,
                },
            });
        }
        catch (err) {
            return res.status(400).json({ msg: "Cannot Fetch Components from DB!" });
        }
        try {
            nodes = yield axios_1.default
                .post(`${process.env.COMMAND_ENDPOINT}`, {
                command: `g.V().hasId('${componentid}').emit().repeat(out('contains'))`,
            }, {
                headers: {
                    Authorization: authHeader,
                },
            });
        }
        catch (err) {
            return res.status(400).json({ msg: "Cannot Fetch Components from DB!" });
        }
        tree = tree.data.result[0];
        nodes = nodes.data.result;
        const findNodeByRid = (rid) => {
            return nodes.find((node) => node["@rid"] === rid);
        };
        // Recursive function to build the nested object
        const buildNestedObject = (tree) => {
            const result = [];
            for (const key in tree) {
                //@ts-ignore
                const rid = key.match(/v\[(.*)\]/)[1]; // Extract @rid from the key
                const node = findNodeByRid(rid);
                if (node) {
                    const newNode = Object.assign(Object.assign({}, node), { children: [] });
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
    }
    catch (err) {
        return res.status(401).json("Cannot fetch Hierarchy");
    }
});
exports.GetHierarchyUI = GetHierarchyUI;
const GetEnvironments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = yield (0, generateAuthorizationHeader_1.GenerateAuthorizationHeader)(`${process.env.USERNAMENAME}`, `${process.env.PASSWORD}`);
        const result = yield axios_1.default.post(`${process.env.COMMAND_ENDPOINT}`, {
            command: "g.V().has('components','uniobjecttypeid',504)",
        }, {
            headers: {
                Authorization: authHeader,
            },
        });
        res.status(200).json({
            msg: "Fetched Environments successfully!",
            data: result.data.result,
        });
    }
    catch (err) {
        res.status(400).json({ msg: "Cannot Fetch Environments!" });
    }
});
exports.GetEnvironments = GetEnvironments;
const GetGuardianServers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = yield (0, generateAuthorizationHeader_1.GenerateAuthorizationHeader)(`${process.env.USERNAMENAME}`, `${process.env.PASSWORD}`);
        yield axios_1.default
            .post(`${process.env.COMMAND_ENDPOINT}`, {
            command: "g.V().has('components','uniobjecttypeid',506)",
        }, {
            headers: {
                Authorization: authHeader,
            },
        })
            .then((result) => {
            res.status(200).json({
                msg: "Fetched GuardianServers successfully!",
                data: result.data.result,
            });
        });
    }
    catch (err) {
        res.status(400).json({ msg: "Cannot Fetch GuardianServers!" });
    }
});
exports.GetGuardianServers = GetGuardianServers;
const GetSites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = yield (0, generateAuthorizationHeader_1.GenerateAuthorizationHeader)(`${process.env.USERNAMENAME}`, `${process.env.PASSWORD}`);
        yield axios_1.default
            .post(`${process.env.COMMAND_ENDPOINT}`, {
            command: "g.V().has('components','uniobjecttypeid',503)",
        }, {
            headers: {
                Authorization: authHeader,
            },
        })
            .then((result) => {
            res.status(200).json({
                msg: "Fetched Sites successfully!",
                data: result.data.result,
            });
        });
    }
    catch (err) {
        res.status(400).json({ msg: "Cannot Fetch Sites!" });
    }
});
exports.GetSites = GetSites;
const GetOrganizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = yield (0, generateAuthorizationHeader_1.GenerateAuthorizationHeader)(`${process.env.USERNAMENAME}`, `${process.env.PASSWORD}`);
        yield axios_1.default
            .post(`${process.env.COMMAND_ENDPOINT}`, {
            command: "g.V().has('components','uniobjecttypeid',502)",
        }, {
            headers: {
                Authorization: authHeader,
            },
        })
            .then((result) => {
            res.status(200).json({
                msg: "Fetched Organizations successfully!",
                data: result.data.result,
            });
        });
    }
    catch (err) {
        res.status(400).json({ msg: "Cannot Fetch Organizations!" });
    }
});
exports.GetOrganizations = GetOrganizations;
const GetScenes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = yield (0, generateAuthorizationHeader_1.GenerateAuthorizationHeader)(`${process.env.USERNAMENAME}`, `${process.env.PASSWORD}`);
        yield axios_1.default
            .post(`${process.env.COMMAND_ENDPOINT}`, {
            command: "g.V().has('components','uniobjecttypeid',501)",
        }, {
            headers: {
                Authorization: authHeader,
            },
        })
            .then((result) => {
            res.status(200).json({
                msg: "Fetched Scenes successfully!",
                data: result.data.result,
            });
        });
    }
    catch (err) {
        res.status(400).json({ msg: "Cannot Fetch Scenes!" });
    }
});
exports.GetScenes = GetScenes;
