"use client";

import { Grid, theme } from "antd";
import Consultor360OriginalLogo from "@/assets/logo-original";
import Link from "next/link";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { token } = useToken();
  const screens = useBreakpoint();

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    section: {
      placeItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "grid",
      height: "100vh",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
  } satisfies Record<string, React.CSSProperties>;

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <Link href={"/"}>
          <Consultor360OriginalLogo />
        </Link>
        {children}
      </div>
    </section>
  );
}
