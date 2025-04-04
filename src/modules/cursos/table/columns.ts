import { type TableColumnsType } from "antd";
import type { Curso } from "../types";
import React from "react";
// import { useColumnSearchProps } from "@/hooks/table/filters";

export const useColumns = (): TableColumnsType<Curso> => {
  // const { getColumnSearchProps } = useColumnSearchProps<Curso>();
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
          // ...getColumnSearchProps("nombre"),
        },
        {
          title: "Descripción",
          dataIndex: "descripcion",
          key: "descripcion",
          width: "20%",
          // ...getColumnSearchProps("descripcion"),
        },
        {
          title: "Fecha de inicio",
          dataIndex: "fecha_inicio",
          key: "fecha_inicio",
          width: "20%",
        },
        {
          title: "Fecha de fin",
          dataIndex: "fecha_fin",
          key: "fecha_fin",
          width: "20%",
        },
        {
          title: "Estado",
          dataIndex: "activo",
          key: "activo",
          width: "20%",
          render: (value: boolean) => (value ? "Activo" : "Inactivo"),
        },
      ] as TableColumnsType<Curso>,
    []
  );
  return columns;
};
