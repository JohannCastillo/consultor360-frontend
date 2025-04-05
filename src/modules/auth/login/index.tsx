"use client";
import { Typography } from "antd";
import LoginForm from "@/modules/auth/login/forms";
import { useAuthLayoutStyles } from "../hooks/use-auth-layout-styles";

const { Text, Title, Link } = Typography;

export default function Login() {
  const styles = useAuthLayoutStyles();

  return (
    <article style={{ width: "380px" }}>
      <header>
        <Title style={styles.title}>Iniciar sesión</Title>
        <Text style={styles.text}>Bienvenido a Consultor 360</Text>
      </header>
      <LoginForm />
      <footer>
        <div style={styles.footer}>
          <Text style={styles.text}>¿No tiene una cuenta?</Text>{" "}
          <Link href="/register">Regístrese</Link>
        </div>
      </footer>
    </article>
  );
}
