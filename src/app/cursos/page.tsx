import AddCursoModal from "@/modules/cursos/modals/add-curso.modal";
import CursoTableClient from "@/modules/cursos/table/client";

export default function CursosPage() {
  return (
    <section>
      <h2>Gestión de cursos</h2>
      <AddCursoModal />
      <CursoTableClient />
    </section>
  );
}
