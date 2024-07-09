"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentUpdation = exports.TenantCreation = exports.VertexId = exports.ComponentCreation = void 0;
const zod_1 = require("zod");
exports.ComponentCreation = zod_1.z.object({
    active: zod_1.z.number().optional(),
    data: zod_1.z.string().optional(),
    datakey: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    dind_and_comp: zod_1.z.number().optional(),
    imageid: zod_1.z.number().optional(),
    ispublished: zod_1.z.number().optional(),
    itemid: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    objectversion: zod_1.z.number().optional(),
    originatorid: zod_1.z.number().optional(),
    profileid: zod_1.z.number().optional(),
    state: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
    statusupdatedate: zod_1.z.string().optional(),
    uniobjecttypeid: zod_1.z.number().optional(),
    updatedate: zod_1.z.string().optional(),
    updatorname: zod_1.z.string().optional(),
    uuid: zod_1.z.string().optional(),
    children: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.VertexId = zod_1.z.string();
exports.TenantCreation = zod_1.z.object({
    tenantname: zod_1.z.string(),
    children: zod_1.z.array(zod_1.z.string())
});
exports.ComponentUpdation = zod_1.z.object({
    componentid: zod_1.z.string(),
    active: zod_1.z.number().optional(),
    data: zod_1.z.string().optional(),
    datakey: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    dind_and_comp: zod_1.z.number().optional(),
    imageid: zod_1.z.number().optional(),
    ispublished: zod_1.z.number().optional(),
    itemid: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    objectversion: zod_1.z.number().optional(),
    originatorid: zod_1.z.number().optional(),
    profileid: zod_1.z.number().optional(),
    state: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
    statusupdatedate: zod_1.z.string().optional(),
    uniobjecttypeid: zod_1.z.number().optional(),
    updatedate: zod_1.z.string().optional(),
    updatorname: zod_1.z.string().optional(),
    uuid: zod_1.z.string().optional(),
    children: zod_1.z.array(zod_1.z.string()).optional(),
    removechildren: zod_1.z.array(zod_1.z.string()).optional(),
});
