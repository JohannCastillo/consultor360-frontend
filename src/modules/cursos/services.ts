"use server";

import { fetcher } from "@/lib/fetcher";
import {
  CreateCursoDTO,
  Curso,
  GetCursosQueryParams,
  UpdateCursoParams,
} from "./types";
import { ApiResponse } from "@/types/api-response";

export async function getCursos(
  params?: GetCursosQueryParams
): Promise<Curso[]> {
  
  const response = await fetcher("/consultor/cursos", {
    query: params?.filters || {},
  });

  if (!response.ok) {
    throw new Error("Error al obtener cursos");
  }
  return response.json();
}

export async function createCurso(
  data: CreateCursoDTO
): Promise<ApiResponse<Curso>> {
  try {
    const response = await fetcher("/consultor/cursos/", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const _data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        errorCode: response.status,
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

export async function updateCurso({
  id,
  data,
}: UpdateCursoParams): Promise<ApiResponse<Curso>> {
  const response = await fetcher(`/consultor/cursos/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  const _data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: _data,
      errorCode: response.status,
    };
  }

  return {
    success: true,
    data: _data,
  };
}

export async function deleteCurso(id: string): Promise<ApiResponse<null>> {
  const response = await fetcher(`/consultor/cursos/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    return {
      success: false,
      error: "Error al eliminar curso",
      errorCode: response.status,
    };
  }

  return {
    success: true,
    data: null,
  };
}
