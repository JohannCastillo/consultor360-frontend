import { theme } from "antd";

export const useAuthLayoutStyles = () => {
  const { useToken } = theme;
  const { token } = useToken();

  return {
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    header: {
      marginBottom: token.marginXL,
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: token.fontSizeHeading2,
    },
  } satisfies Record<string, React.CSSProperties>;
};
