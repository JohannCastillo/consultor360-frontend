import type { Metadata } from "next";
import AdminLayout from "@/layouts/admin-layout";

export const metadata: Metadata = {
  title: "Prueba técnica | Consultor 360",
  description: "Prueba técnica Consultor 360",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}
