import AddCursoModal from "@/modules/cursos/modals/add-curso.modal";
import CursoTableClient from "@/modules/cursos/table/client";
import { Flex, Space } from "antd";
import { BookFilled } from "@ant-design/icons";

export default async function CursosPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  return (
    <section className="space-y-8">
      <Flex wrap justify="space-between" align="center">
        <Space>
          <BookFilled
            style={{
              fontSize: "2rem",
            }}
          />
          <h2 className="text-xl">Administrar cursos</h2>
        </Space>
        <AddCursoModal />
      </Flex>
      <CursoTableClient searchParams={searchParams} />
    </section>
  );
}
