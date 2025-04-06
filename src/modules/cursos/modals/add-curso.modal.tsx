"use client";
import React from "react";
import AsyncModal from "@/components/ui/async-modal";
import { CURSOS_KEYS, useCreateCurso } from "../queries";
import AddCursoForm from "../forms/create";
import { Form } from "antd";
import type { CreateCursoFieldType } from "../forms/fields";
import type { CreateCursoDTO, Curso } from "../types";

export default function AddCursoModal() {
  const { mutateAsync, isPending } = useCreateCurso();
  const [form] = Form.useForm<CreateCursoFieldType>();

  const transformValues = ({
    dateRange,
    ...values
  }: CreateCursoFieldType): CreateCursoDTO => ({
    ...values,
    fecha_fin: dateRange[1].format("YYYY-MM-DD"),
    fecha_inicio: dateRange[0].format("YYYY-MM-DD"),
  });

  return (
    <Form.Provider>
      <AsyncModal<CreateCursoFieldType, Curso>
        title="Añadir curso"
        trigger="Nuevo"
        queryKey={CURSOS_KEYS.list}
        form={form}
        onConfirm={() => {
          const transformedValues = transformValues(form.getFieldsValue());
          return mutateAsync(transformedValues);
        }}
        afterClose={() => form.resetFields()}
      >
        <AddCursoForm
          form={form}
          disabled={isPending || false}
          initialValues={
            {
              activo: true,
              descripcion: "",
              nombre: "",
            } as CreateCursoFieldType
          }
        />
      </AsyncModal>
    </Form.Provider>
  );
}
