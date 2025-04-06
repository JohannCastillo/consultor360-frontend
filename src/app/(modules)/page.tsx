import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio"
};

export default function HomePage() {
  return (
    <section className="grid place-content-center">
      <h1>Bienvenido</h1>
    </section>
  );
}
