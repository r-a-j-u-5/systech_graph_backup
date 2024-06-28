import { z } from "zod";

export const ComponentCreation = z.object({
  active: z.number().optional(),
  data: z.string().optional(),
  datakey: z.string().optional(),
  description: z.string().optional(),
  dind_and_comp: z.number().optional(),
  imageid: z.number().optional(),
  ispublished: z.number().optional(),
  itemid: z.string().optional(),
  name: z.string().optional(),
  objectversion: z.number().optional(),
  originatorid: z.number().optional(),
  profileid: z.number().optional(),
  state: z.string().optional(),
  status: z.string().optional(),
  statusupdatedate: z.string().optional(),
  uniobjecttypeid: z.number().optional(),
  updatedate: z.string().optional(),
  updatorname: z.string().optional(),
  uuid: z.string().optional(),
  children: z.array(z.string()).optional(),
});

export const VertexId = z.string();

export const TenantCreation = z.object({
  tenantname : z.string(),
  children : z.array(z.string())
})

export const ComponentUpdation = z.object({
  componentid: z.string(),
  active: z.number().optional(),
  data: z.string().optional(),
  datakey: z.string().optional(),
  description: z.string().optional(),
  dind_and_comp: z.number().optional(),
  imageid: z.number().optional(),
  ispublished: z.number().optional(),
  itemid: z.string().optional(),
  name: z.string().optional(),
  objectversion: z.number().optional(),
  originatorid: z.number().optional(),
  profileid: z.number().optional(),
  state: z.string().optional(),
  status: z.string().optional(),
  statusupdatedate: z.string().optional(),
  uniobjecttypeid: z.number().optional(),
  updatedate: z.string().optional(),
  updatorname: z.string().optional(),
  uuid: z.string().optional(),
  children: z.array(z.string()).optional(),
  removechildren: z.array(z.string()).optional(),
});