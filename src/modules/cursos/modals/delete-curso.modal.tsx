"use client";
import React from "react";
import AsyncModal from "@/components/ui/async-modal";
import { CURSOS_KEYS, useDeleteCurso } from "../queries";
import { Button, Form } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import type { Curso } from "../types";

export default function DeleteCursoModal({
  curso,
}: {
  curso: Pick<Curso, "id" | "nombre">;
}) {
  const { mutateAsync } = useDeleteCurso();

  return (
    <Form.Provider>
      <AsyncModal
        title="Eliminar curso"
        okText="Eliminar"
        trigger={
          <Button danger aria-label="Eliminar curso">
            <DeleteFilled />
          </Button>
        }
        okButtonProps={{ danger: true }}
        queryKey={CURSOS_KEYS.list}
        onConfirm={async () => {
          try {
            const res = await mutateAsync(curso.id);
            if (!res.success) {
              // TODO: show error message
              console.log(res.error);
            }
            return res.success;
          } catch (error) {
            console.error(error);
            return false;
          }
        }}
      >
        ¿Está seguro que quiere eliminar el curso {curso.nombre}?
      </AsyncModal>
    </Form.Provider>
  );
}
