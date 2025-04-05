import AuthLayout from "@/layouts/login-layout";
import { serverSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  // si el usuario tiene una sesion activa, redirigir
  const session = await serverSession();

  if (session) {
    return redirect("/");
  }

  return <AuthLayout>{children}</AuthLayout>;
}
