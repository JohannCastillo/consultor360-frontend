import React from "react";
import { HomeFilled, BookOutlined } from "@ant-design/icons";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";

export const ROUTES: ItemType<MenuItemType>[] = [
  {
    key: "/",
    label: "Inicio",
    icon: React.createElement(HomeFilled),
  },
  {
    key: "/cursos",
    label: "Cursos",
    icon: React.createElement(BookOutlined),
  }
] as const;
