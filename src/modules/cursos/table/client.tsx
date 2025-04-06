"use client";
import { Table } from "antd";
import { useCursos } from "../queries";
import type { Curso, GetCursosQueryParams } from "../types";
import { useColumns } from "./columns";
import { useTableParams } from "@/hooks/table/use-table-params";

export default function CursoTableClient({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  const columns = useColumns();
  const { handleFilterChange } = useTableParams<Curso>();

  const {
    data: cursos,
    isLoading,
    isFetching,
    isError,
  } = useCursos({
    filters: {
      nombre: searchParams.nombre,
      descripcion: searchParams.descripcion,
      estado: searchParams.activo,
    } as GetCursosQueryParams["filters"],
  });

  if (isError) {
    return <div>Error al cargar cursos</div>;
  }

  return (
    <Table<Curso>
      scroll={{ x: 768 }}
      columns={columns}
      dataSource={cursos}
      loading={isLoading || isFetching || false}
      rowKey={"id"}
      onChange={(_, filter, __) => {
        handleFilterChange({ filter });
      }}
    />
  );
}
