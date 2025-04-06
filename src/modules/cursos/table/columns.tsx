import { Space, Tag, type TableProps } from "antd";
import type { Curso } from "../types";
import React from "react";
import UpdateCursoModal from "../modals/update-curso.modal";
import DeleteCursoModal from "../modals/delete-curso.modal";
import { useColumnTextSearch } from "@/hooks/table/use-column-text-search";

export const useColumns = (): TableProps<Curso>["columns"] => {
  const { getColumnSearchProps } = useColumnTextSearch<Curso>();

  const columns = React.useMemo(
    () =>
      [
        {
          title: "Id",
          dataIndex: "id",
          key: "id",
          width: "1%",
          hidden: true,
        },
        {
          title: "Nombre",
          dataIndex: "nombre",
          key: "nombre",
          width: "20%",
          sorter: (a, b) => a.nombre.localeCompare(b.nombre),
          ...getColumnSearchProps("nombre"),
        },
        {
          title: "Descripción",
          dataIndex: "descripcion",
          key: "descripcion",
          ...getColumnSearchProps("descripcion"),
        },
        {
          title: "Fecha de inicio",
          dataIndex: "fecha_inicio",
          key: "fecha_inicio",
        },
        {
          title: "Fecha de fin",
          dataIndex: "fecha_fin",
          key: "fecha_fin",
        },
        {
          title: "Estado",
          dataIndex: "activo",
          key: "activo",
          filters: [
            {
              text: "Activo",
              value: "activo",
            },
            {
              text: "Inactivo",
              value: "inactivo",
            },
          ],
          render: (value: boolean) => (
            <Tag color={value ? "green" : "red"}>
              {value ? "Activo" : "Inactivo"}
            </Tag>
          ),
        },
        {
          title: "Acciones",
          key: "actions",
          render: (_, record) => {
            return (
              <Space size={"middle"}>
                <UpdateCursoModal curso={record} />
                <DeleteCursoModal curso={record} />
              </Space>
            );
          },
        },
      ] as TableProps<Curso>["columns"],
    []
  );
  return columns;
};
