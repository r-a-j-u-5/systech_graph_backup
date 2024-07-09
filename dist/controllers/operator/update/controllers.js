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
exports.UpdateComponentIOT = void 0;
const axios_1 = __importDefault(require("axios"));
const generateAuthorizationHeader_1 = require("../../../utils/generateAuthorizationHeader");
const dotenv_1 = __importDefault(require("dotenv"));
const validators_1 = require("../../../validators/validators");
const vertex_data_1 = require("../../../resources/vertex_data");
dotenv_1.default.config();
const UpdateComponentIOT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        try {
            validators_1.ComponentUpdation.parse(req.body);
        }
        catch (err) {
            return res.status(403).json({ msg: "Invalid Data!" });
        }
        const data = req.body;
        const fields_not_included = ["children", "removechildren", "componentid"];
        const maincomponentid = data.componentid;
        let command = `g.V().hasId('${maincomponentid}')`;
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
            return res.status(401).json({ msg: "Cannot Update IOT Component!" });
        });
        for (let i = 0; i < ((_a = data === null || data === void 0 ? void 0 : data.children) === null || _a === void 0 ? void 0 : _a.length); i++) {
            let command = `g.V().hasId('${maincomponentid}').as('a').V().hasId('${data === null || data === void 0 ? void 0 : data.children[i]}').as('b').addE('manages').from('a').to('b')`;
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
                    .json({ msg: "Cannot add new children components!" });
            });
        }
        for (let i = 0; i < ((_b = data === null || data === void 0 ? void 0 : data.removechildren) === null || _b === void 0 ? void 0 : _b.length); i++) {
            let command = `g.V().hasId('${maincomponentid}').outE('manages').where(inV().hasId('${data === null || data === void 0 ? void 0 : data.removechildren[i]}')).drop()
        `;
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
                    .json({ msg: "Cannot delink child node fro  main node!" });
            });
        }
        return res.status(200).json({ msg: "IOT Component Updated Successfully!" });
    }
    catch (err) {
        return res.status(400).json({ msg: "Cannot Update IOT Component!" });
    }
});
exports.UpdateComponentIOT = UpdateComponentIOT;
