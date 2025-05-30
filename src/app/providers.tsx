"use client";

import { THEME } from "@/constants/theme";
import { StyleProvider } from "@ant-design/cssinjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { SessionProvider } from "next-auth/react";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();

  return (
    // Ant Design Styling Providers
    <AntdRegistry>
      <StyleProvider layer hashPriority="high">
        <ConfigProvider theme={THEME}>
          {/* Tanstack Query Providers */}
          <QueryClientProvider client={queryClient}>
            {/* Next Auth Providers */}
            <SessionProvider>{children}</SessionProvider>
          </QueryClientProvider>
        </ConfigProvider>
      </StyleProvider>
    </AntdRegistry>
  );
}
