export type Curso = {
  id: string;
  nombre: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  activo: boolean;
};

export type GetCursosQueryParams = Partial<{
  filters: Partial<{
    nombre: string;
    descripcion: string;
    estado: string;
  }>;
}>;

// Used for filter in table columns
export type CursoDataIndex = keyof Curso;

export type CreateCursoDTO = Omit<Curso, "id">;
export type UpdateCursoDTO = Partial<CreateCursoDTO>;

export type UpdateCursoParams = {
  id: string;
  data: UpdateCursoDTO;
};
