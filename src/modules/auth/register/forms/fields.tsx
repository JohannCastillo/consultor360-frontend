import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { type FormFieldItem } from "@/types/forms";
import type { CreateUserDTO } from "../../types";

export type CreateUserFieldType = CreateUserDTO & {
  confirmPassword: string;
};

export const registerFields: FormFieldItem<CreateUserFieldType>[] = [
  {
    name: "username",
    label: "Nombre de usuario",
    type: "text",
    rules: [
      {
        required: true,
        message: "Ingrese su nombre de usuario",
      },
    ],
    inputProps: {
      prefix: <UserOutlined />,
    },
  },
  {
    name: "email",
    label: "Correo electrónico",
    type: "text",
    rules: [
      {
        required: false,
        type: "email",
      },
    ],
    inputProps: {
      prefix: <MailOutlined />,
    },
  },

  {
    name: "password",
    label: "Contraseña",
    type: "password",
    rules: [
      {
        required: true,
      },
    ],
    inputProps: {
      prefix: <LockOutlined />,
    },
  },
  {
    name: "confirmPassword",
    label: "Confirmar contraseña",
    type: "password",
    dependencies: ["password"],
    rules: [
      {
        required: true,
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("Las contraseñas no coinciden."));
        },
      }),
    ],
    inputProps: {
      prefix: <LockOutlined />,
    },
  },
];
