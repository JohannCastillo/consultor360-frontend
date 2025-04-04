import type { FormItemProps } from "antd";

export type FormFieldType =
  | "text"
  | "date"
  | "date-range"
  | "text-area"
  | "number"
  | "checkbox";

export type FormFieldItem<T> = FormItemProps<T> & {
  type: FormFieldType;
};
