import { Curso } from "../types";
import { type FormFieldItem } from "@/types/forms";

export type CreateCursoFieldType = Omit<
  Curso,
  "id" | "fecha_inicio" | "fecha_fin"
> & {
  dateRange: [Date, Date];
};

export const cursoFields: FormFieldItem<CreateCursoFieldType>[] = [
  {
    label: "Nombre",
    name: "nombre",
    type: "text",
    rules: [
      {
        required: true,
      },
    ],
  },
  {
    label: "Fecha de inicio y fin",
    name: "dateRange",
    type: "date-range",
    rules: [{ required: true, type: "array" }],
  },
  {
    label: "Descripción",
    name: "descripcion",
    type: "text-area",
    rules: [{ required: true }],
  },
  {
    label: "Activo",
    name: "activo",
    type: "checkbox",
    valuePropName: "checked",
  },
];
