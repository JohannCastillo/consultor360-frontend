"use client";
import React from "react";
import { Layout, theme } from "antd";
import AdminLayoutSidebar from "./siderbar";
import AdminLayoutHeader from "./header";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const {
    token: { colorBgContainer, colorBgLayout, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <AdminLayoutSidebar />
      <Layout
        style={{
          background: colorBgLayout,
        }}
      >
        <AdminLayoutHeader colorBgContainer={colorBgContainer} />
        <Layout.Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: "center" }}>
          © Consultor 360
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}
