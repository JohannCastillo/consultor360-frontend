"use client";
import React from "react";
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

  return (
    <Form.Provider>
      <AsyncModal
        title="Actualizar curso"
        trigger={
          <Button type="primary" aria-label="Eliminar curso">
            <EditFilled />
          </Button>
        }
        queryKey={CURSOS_KEYS.list}
        onConfirm={async () => {
          try {
            form.submit();

            await form.validateFields();

            const values = transformValues(form.getFieldsValue());
            const res = await mutateAsync({
              id: curso.id,
              data: values,
            });
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
              ...curso,
              dateRange: [
                dayjs(curso.fecha_inicio, "YYYY-MM-DD"),
                dayjs(curso.fecha_fin, "YYYY-MM-DD"),
              ],
            } as CreateCursoFieldType
          }
        />
      </AsyncModal>
    </Form.Provider>
  );
}
