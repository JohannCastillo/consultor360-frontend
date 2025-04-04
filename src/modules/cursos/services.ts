"use server";

import { fetcher } from "@/lib/fetcher";
import { CreateCursoDTO, Curso, GetCursosQueryParams } from "./types";
import { ApiResponse } from "@/types/api-response";

export async function getCursos(
  params?: GetCursosQueryParams
): Promise<Curso[]> {
  const response = await fetcher("/cursos");
  if (!response.ok) {
    throw new Error("Error al obtener cursos");
  }
  return response.json();
}

export async function createCurso(
  data: CreateCursoDTO
): Promise<ApiResponse<Curso>> {
  try {
    console.log(data);
    const response = await fetcher("/cursos/", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const _data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: _data,
      };
    }

    return {
      success: true,
      data: _data,
    };
  } catch (error) {
    return {
      success: false,
      error: "Ocurrió un error inesperado al crear el curso",
    };
  }
}

export async function updateCurso(id: string, data: CreateCursoDTO) {
  const response = await fetcher(`/cursos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error("Error al actualizar curso");
  }
  return response.json();
}

export async function deleteCurso(id: string) {
  const response = await fetcher(`/cursos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar curso");
  }
  return response.json();
}
