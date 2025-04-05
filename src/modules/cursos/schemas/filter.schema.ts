import { z } from "zod";
import type { GetCursosQueryParams } from "../types";

export const filterSchema: z.ZodType<GetCursosQueryParams["filters"]> = z
  .object({
    nombre: z.string(),
    descripcion: z.string(),
    estado: z.enum(["activo", "inactivo", "activo,inactivo"]),
  })
  .partial();
