"use client";

import React from "react";
import { Button, Form, Input, message } from "antd";
import { loginFields } from "./fields";
import { LoginUserDTO } from "../../types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const onFinish = async (values: LoginUserDTO) => {
    try {
      const signin = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (signin?.ok) {
        router.replace("/");
        return;
      }

      if (signin?.error === "CredentialsSignin")
        messageApi.error("Credenciales incorrectas");

      if (signin?.error === "fetch failed")
        messageApi.error(
          "No se pudo conectar con el servidor, intente de nuevo más tarde."
        );
    } catch (error) {
      console.error(error);
      messageApi.error(
        "Error al intentar iniciar sesión, intente de nuevo más tarde."
      );
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        name="login"
        onFinish={onFinish}
        layout="vertical"
      >
        {loginFields.map((field) => {
          const { type, inputProps, ...fieldProps } = field;
          return (
            <Form.Item<LoginUserDTO>
              key={fieldProps.name as string}
              {...fieldProps}
            >
              {type === "password" ? (
                <Input.Password type="password" {...inputProps} />
              ) : (
                <Input {...inputProps} />
              )}
            </Form.Item>
          );
        })}

        <Form.Item style={{ marginBottom: "0px" }}>
          <Button block={true} type="primary" htmlType="submit">
            Iniciar sesión
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
