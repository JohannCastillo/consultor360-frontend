import { useSonnerStore } from "@/stores/sonner.store";
import type { ErrorResponse } from "@/types/api-response";
import { parseBadRequestObjectErrorToNode } from "@/utils/api-errors/error-parser";
import Link from "next/link";

export function useApiResponseHandler() {
  const { showAlert } = useSonnerStore();

  function handleError(error: ErrorResponse) {
    // bad request
    if (error.errorCode === 400) {
      const description = parseBadRequestObjectErrorToNode(error);

      showAlert({
        message: "Error de validación",
        type: "error",
        description,
      });
      return;
    }

    if (error.errorCode === 403) {
      showAlert({
        message: "Error de autorización",
        type: "error",
        description: (
          <div>
            No se encuentra autenticado,{" "}
            <Link href={"/login"}>inicie sesión</Link> para realizar esta acción
          </div>
        ),
      });
      return;
    }

    // TODO: handle other error codes
    showAlert({
      message: "Error",
      type: "error",
      description: "Ocurrió un error inesperado al procesar la petición.",
    });
  }

  return {
    handleError,
  };
}
