"use client";

import React from "react";
import {
  Checkbox,
  Form,
  Input,
  DatePicker,
  type FormProps,
} from "antd";
import { CreateCursoFieldType, cursoFields } from "./fields";

export default function AddCursoForm(props: FormProps) {
  return (
    <Form {...props}>
      {cursoFields.map((field) => {
        const { type, ...fieldProps } = field;
        return (
          <Form.Item<CreateCursoFieldType> 
            key={fieldProps.name as string}
            {...fieldProps}>
            {type === "checkbox" ? (
              <Checkbox />
            ) : type === "text-area" ? (
              <Input.TextArea />
            ) : type === "date-range" ? (
              <DatePicker.RangePicker
                placeholder={["Fecha de inicio", "Fecha de fin"]}
              />
            ) : (
              <Input />
            )}
          </Form.Item>
        );
      })}
    </Form>
  );
}
