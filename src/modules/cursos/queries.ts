import { useMutation, useQuery } from "@tanstack/react-query";
import { createCurso, getCursos } from "./services";
import { CreateCursoDTO } from "./types";

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
