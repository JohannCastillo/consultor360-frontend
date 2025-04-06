import Register from "@/modules/auth/register";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro",
};

export default function RegisterPage() {
  return <Register />;
}
