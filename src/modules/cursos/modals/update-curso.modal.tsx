"use client";
import React, { useEffect } from "react";
import AsyncModal from "@/components/ui/async-modal";
import { CURSOS_KEYS, useUpdateCurso } from "../queries";
import AddCursoForm from "../forms/create";
import { Button, Form } from "antd";
import type { CreateCursoFieldType } from "../forms/fields";
import type { Curso, UpdateCursoDTO } from "../types";
import { EditFilled } from "@ant-design/icons";
import dayjs from "dayjs";

export default function UpdateCursoModal({ curso }: { curso: Curso }) {
  const { mutateAsync, isPending } = useUpdateCurso();
  const [form] = Form.useForm<CreateCursoFieldType>();

  const transformValues = ({
    dateRange,
    ...values
  }: CreateCursoFieldType): UpdateCursoDTO => ({
    ...values,
    fecha_fin: dateRange[1].format("YYYY-MM-DD"),
    fecha_inicio: dateRange[0].format("YYYY-MM-DD"),
  });

  // reset values
  useEffect(() => {
    form.setFieldsValue({
      ...curso,
      dateRange: [
        dayjs(curso.fecha_inicio, "YYYY-MM-DD"),
        dayjs(curso.fecha_fin, "YYYY-MM-DD"),
      ],
    });
  }, [curso, form]);

  return (
    <Form.Provider>
      <AsyncModal
        title="Actualizar curso"
        trigger={
          <Button type="primary" aria-label="Actualizar curso">
            <EditFilled />
          </Button>
        }
        form={form}
        queryKey={CURSOS_KEYS.list}
        onConfirm={async () => {
          const values = transformValues(form.getFieldsValue());
          return mutateAsync({
            id: curso.id,
            data: values,
          });
        }}
      >
        <AddCursoForm form={form} disabled={isPending || false} />
      </AsyncModal>
    </Form.Provider>
  );
}
