"use client";
import React from "react";
import { Button, Layout, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import AdminLayoutSidebar from "./siderbar";
import { useSidebarStore } from "@/stores/sidebar.store";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { Header, Content, Footer } = Layout;
  const { collapsed, setCollapsed } = useSidebarStore();

  const {
    token: { 
      colorBgContainer, 
      colorBgLayout, 
      borderRadiusLG 
    },
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
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
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
        </Content>
        <Footer style={{ textAlign: "center" }}>© Consultor 360</Footer>
      </Layout>
    </Layout>
  );
}
