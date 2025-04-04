"use client";
import { Table } from "antd";
import { useCursos } from "../queries";
import type { Curso } from "../types";
import { useColumns } from "./columns";

export default function CursoTableClient() {
  const { data: cursos, isLoading, isFetching, isError } = useCursos();
  const columns = useColumns();
  
  if (isError) {
    return <div>Error al cargar cursos</div>;
  }

  return (
    <Table<Curso>
      columns={columns}
      dataSource={cursos}
      loading={isLoading || isFetching}
      rowKey={"id"}
    />
  );
}
