"use client";

import React from "react";
import { Button, Form, Input, type FormProps } from "antd";
import { CreateUserFieldType, registerFields } from "./fields";
import { CreateUserDTO } from "../../types";
import { useCreateUser } from "../../queries";
import { useRouter } from "next/navigation";
import { useSonnerStore } from "@/stores/sonner.store";

export default function RegisterForm(props: FormProps) {
  const { mutateAsync, isPending } = useCreateUser();
  const { showAlert } = useSonnerStore();
  const router = useRouter();

  const onFinish = async (values: CreateUserDTO) => {
    const res = await mutateAsync(values);
    if (res.success) {
      console.log("registrado con éxito");
      router.replace("/");
      return;
    }

    showAlert({
      message: "Error al registrar",
      type: "error",
      description: res.error,
    });
  };

  return (
    <Form {...props} layout="vertical" onFinish={onFinish} disabled={isPending || false}>
      {registerFields.map((field) => {
        const { type, inputProps, ...fieldProps } = field;
        return (
          <Form.Item<CreateUserFieldType>
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
            Registrarme
          </Button>
        </Form.Item>
    </Form>
  );
}
