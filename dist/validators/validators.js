"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantCreation = exports.VertexId = exports.ComponentCreation = void 0;
const zod_1 = require("zod");
exports.ComponentCreation = zod_1.z.object({
    active: zod_1.z.number(),
    data: zod_1.z.string(),
    datakey: zod_1.z.string(),
    description: zod_1.z.string(),
    dind_and_comp: zod_1.z.number(),
    imageid: zod_1.z.number(),
    ispublished: zod_1.z.number(),
    itemid: zod_1.z.string(),
    name: zod_1.z.string(),
    objectversion: zod_1.z.number(),
    originatorid: zod_1.z.number(),
    profileid: zod_1.z.number(),
    state: zod_1.z.string(),
    status: zod_1.z.string(),
    statusupdatedate: zod_1.z.string(),
    uniobjecttypeid: zod_1.z.number(),
    updatedate: zod_1.z.string(),
    updatorname: zod_1.z.string(),
    uuid: zod_1.z.string(),
    children: zod_1.z.array(zod_1.z.string()),
});
exports.VertexId = zod_1.z.string();
exports.TenantCreation = zod_1.z.object({
    tenantname: zod_1.z.string(),
    children: zod_1.z.array(zod_1.z.string())
});
