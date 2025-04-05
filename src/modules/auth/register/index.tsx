"use client";

import { useAuthLayoutStyles } from "../hooks/use-auth-layout-styles";
import { Typography } from "antd";
import RegisterForm from "./forms";

const { Text, Title, Link } = Typography;

export default function Register() {
  const styles = useAuthLayoutStyles();

  return (
    <article>
      <header>
        <Title style={styles.title}>Registro</Title>
        <Text style={styles.text}>Bienvenido a Consultor 360</Text>
      </header>
      <RegisterForm />
      <footer>
        <div style={styles.footer}>
          <Text style={styles.text}>¿Ya se encuentra registrado?</Text>{" "}
          <Link href="/login">Iniciar sesión</Link>
        </div>
      </footer>
    </article>
  );
}
