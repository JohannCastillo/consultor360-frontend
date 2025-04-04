"use client";
import React from "react";
import AsyncModal from "@/components/ui/async-modal";
import { CURSOS_KEYS, useCreateCurso } from "../queries";
import AddCursoForm from "../forms/create";
import { Form } from "antd";
import type { CreateCursoFieldType } from "../forms/fields";
import type { CreateCursoDTO } from "../types";

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
      <AsyncModal
        title="Añadir curso"
        trigger="Nuevo"
        queryKey={CURSOS_KEYS.list}
        onConfirm={async () => {
          try {
            form.submit();

            await form.validateFields();

            const values = transformValues(form.getFieldsValue());
            const res = await mutateAsync(values);
            if (!res.success) {
              // TODO: show error message
              console.log(res.error);
              return false;
            }

            form.resetFields();

            return res.success;
          } catch (error) {
            console.error(error);
            return false;
          }
        }}
      >
        <AddCursoForm
          form={form}
          disabled={isPending}
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
