import type { ConfigProviderProps } from "antd";

export const THEME = {
  token: {
    colorPrimary: "#769b15",
    colorPrimaryBg: "#fafde8",
    colorPrimaryBgHover: "#f1f9ce",
    colorPrimaryBorder: "#e2f4a2",
    colorPrimaryBorderHover: "#cdea6c",
    colorPrimaryHover: "#597615",
    colorPrimaryActive: "#475e16",
    colorText: "#3A3335",
    colorTextSecondary: "#597615",
    colorBgContainer: "#fff",
    colorBorder: "#e2f4a2",
    colorBgLayout: "#ded9db",
  },
  components: {
    Button: {
      colorPrimary: "#b7dd43",
      colorPrimaryHover: "#97c220",
      colorPrimaryActive: "#769b15",
      colorText: "#3e5017",
    },
    Layout: {
      headerBg: "#f1f9ce",
      bodyBg: "#fafde8",
      siderBg: "#fff",
    },

    Menu: {
      itemBg: "#fafde8",
      itemHoverBg: "#f1f9ce",
      itemColor: "#3e5017",
      itemHoverColor: "#597615",
    },
  },
} satisfies ConfigProviderProps["theme"];
