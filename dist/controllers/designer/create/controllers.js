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
exports.CreateComponentIOT = exports.CreateComponentUI = void 0;
const axios_1 = __importDefault(require("axios"));
const generateAuthorizationHeader_1 = require("../../../utils/generateAuthorizationHeader");
const dotenv_1 = __importDefault(require("dotenv"));
const validators_1 = require("../../../validators/validators");
const vertex_data_1 = require("../../../resources/vertex_data");
dotenv_1.default.config();
const CreateComponentUI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        try {
            validators_1.ComponentCreation.parse(req.body);
        }
        catch (err) {
            return res.status(403).json({ msg: "Invalid Data!" });
        }
        const data = req.body;
        const fields_not_included = ["children"];
        let command = "g.addV('components')";
        for (let [key, value] of Object.entries(data)) {
            if (!(key in fields_not_included))
                if (!(key in vertex_data_1.components_integer_fields))
                    command += `.property('${key}','${value}')`;
                else
                    command += `.property('${key}',${value})`;
        }
        const authHeader = yield (0, generateAuthorizationHeader_1.GenerateAuthorizationHeader)(`${process.env.ORIENTDB_USERNAME}`, `${process.env.ORIENTDB_PASSWORD}`);
        const result = yield axios_1.default
            .post(`${process.env.COMMAND_ENDPOINT}`, {
            command: command,
        }, {
            headers: {
                Authorization: authHeader,
            },
        })
            .catch((err) => {
            return res.status(401).json({ msg: "Cannot create Vertex!" });
        });
        const componentid = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.result[0]["@rid"];
        for (let i = 0; i < data.children.length; i++) {
            let command = `g.V().hasId('${componentid}').as('a').V().hasId('${data.children[i]}').as('b').addE('contains').from('a').to('b')`;
            yield axios_1.default
                .post(`${process.env.COMMAND_ENDPOINT}`, {
                command: command,
            }, {
                headers: {
                    Authorization: authHeader,
                },
            })
                .catch((err) => {
                res
                    .status(402)
                    .json({ msg: "Cannot create edge between parent and child!" });
            });
        }
        return res.status(200).json({ msg: "Component Created Successfully!" });
    }
    catch (err) {
        return res.status(400).json({ msg: "Cannot Create Component!" });
    }
});
exports.CreateComponentUI = CreateComponentUI;
const CreateComponentIOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        try {
            validators_1.ComponentCreation.parse(req.body);
        }
        catch (err) {
            return res.status(403).json({ msg: "Invalid Data!" });
        }
        const data = req.body;
        const fields_not_included = ["children"];
        let command = "g.addV('components')";
        for (let [key, value] of Object.entries(data)) {
            if (!(key in fields_not_included))
                if (!(key in vertex_data_1.components_integer_fields))
                    command += `.property('${key}','${value}')`;
                else
                    command += `.property('${key}',${value})`;
        }
        const authHeader = yield (0, generateAuthorizationHeader_1.GenerateAuthorizationHeader)(`${process.env.ORIENTDB_USERNAME}`, `${process.env.ORIENTDB_PASSWORD}`);
        const result = yield axios_1.default
            .post(`${process.env.COMMAND_ENDPOINT}`, {
            command: command,
        }, {
            headers: {
                Authorization: authHeader,
            },
        })
            .catch((err) => {
            return res.status(401).json({ msg: "Cannot create Vertex!" });
        });
        const componentid = (_b = result === null || result === void 0 ? void 0 : result.data) === null || _b === void 0 ? void 0 : _b.result[0]["@rid"];
        for (let i = 0; i < data.children.length; i++) {
            let command = `g.V().hasId('${componentid}').as('a').V().hasId('${data.children[i]}').as('b').addE('manages').from('a').to('b')`;
            yield axios_1.default
                .post(`${process.env.COMMAND_ENDPOINT}`, {
                command: command,
            }, {
                headers: {
                    Authorization: authHeader,
                },
            })
                .catch((err) => {
                res
                    .status(402)
                    .json({ msg: "Cannot create edge between parent and child!" });
            });
        }
        return res.status(200).json({ msg: "Component Created Successfully!" });
    }
    catch (err) {
        return res.status(400).json({ msg: "Cannot Create Component!" });
    }
});
exports.CreateComponentIOT = CreateComponentIOT;
