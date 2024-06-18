import { z } from "zod";

export const ComponentCreation = z.object({
  active: z.number(),
  data: z.string(),
  datakey: z.string(),
  description: z.string(),
  dind_and_comp: z.number(),
  imageid: z.number(),
  ispublished: z.number(),
  itemid: z.string(),
  name: z.string(),
  objectversion: z.number(),
  originatorid: z.number(),
  profileid: z.number(),
  state: z.string(),
  status: z.string(),
  statusupdatedate: z.string(),
  uniobjecttypeid: z.number(),
  updatedate: z.string(),
  updatorname: z.string(),
  uuid: z.string(),
  children: z.array(z.string()),
});

export const VertexId = z.string();

export const TenantCreation = z.object({
  tenantname : z.string(),
  children : z.array(z.string())
})