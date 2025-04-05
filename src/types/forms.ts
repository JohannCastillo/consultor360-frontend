import type { FormItemProps, InputProps } from "antd";

export type FormFieldType =
  | "text"
  | "date"
  | "date-range"
  | "text-area"
  | "number"
  | "checkbox"
  | "password";

export type FormFieldItem<T> = FormItemProps<T> & {
  type: FormFieldType;
  inputProps?: InputProps;
};
