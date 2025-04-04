import { useMutation, useQuery } from "@tanstack/react-query";
import { createCurso, deleteCurso, getCursos, updateCurso } from "./services";
import { CreateCursoDTO, UpdateCursoDTO, UpdateCursoParams } from "./types";

export const CURSOS_KEYS = {
  list: ["cursos"],
  create: ["create-curso"],
  update: ["update-curso"],
  delete: ["delete-curso"],
};

export const useCursos = () => {
  return useQuery({
    queryKey: CURSOS_KEYS.list,
    queryFn: async () => await getCursos(),
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
    mutationFn: async (data: UpdateCursoParams) =>
      updateCurso(data),
  });

export const useDeleteCurso = () =>
  useMutation({
    mutationKey: CURSOS_KEYS.delete,
    mutationFn: async (id: string) => deleteCurso(id),
  });
