import { type FormFieldItem } from "@/types/forms";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import type { LoginUserDTO } from "../../types";

export const loginFields: FormFieldItem<LoginUserDTO>[] = [
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
      placeholder: "admin@consultor360.com",
    },
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    rules: [
      {
        required: true,
        message: "Ingrese una contraseña",
      },
    ],
    inputProps: {
      prefix: <LockOutlined />,
      placeholder: "**********",
    },
  },
];
