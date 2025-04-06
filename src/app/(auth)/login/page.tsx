import Login from "@/modules/auth/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return <Login />;
}
