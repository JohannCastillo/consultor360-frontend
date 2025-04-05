import { useMutation, useQuery } from "@tanstack/react-query";
import { createCurso, deleteCurso, getCursos, updateCurso } from "./services";
import {
  CreateCursoDTO,
  GetCursosQueryParams,
  UpdateCursoParams,
} from "./types";
import { filterSchema } from "./schemas/filter.schema";

export const CURSOS_KEYS = {
  list: ["cursos"],
  create: ["create-curso"],
  update: ["update-curso"],
  delete: ["delete-curso"],
};

export const useCursos = (params?: GetCursosQueryParams) => {
  const { filters } = params || {};
  const parsedFilters = filterSchema.parse(filters);

  return useQuery({
    queryKey: [...CURSOS_KEYS.list, parsedFilters],
    queryFn: async () =>
      await getCursos({
        filters: parsedFilters,
      }),
  });
};

export const useCreateCurso = () =>
  useMutation({
    mutationKey: CURSOS_KEYS.create,
    mutationFn: async (data: CreateCursoDTO) => createCurso(data),
  });

export const useUpdateCurso = () =>
  useMutation({
    mutationKey: CURSOS_KEYS.update,
    mutationFn: async (data: UpdateCursoParams) => updateCurso(data),
  });

export const useDeleteCurso = () =>
  useMutation({
    mutationKey: CURSOS_KEYS.delete,
    mutationFn: async (id: string) => deleteCurso(id),
  });
