"use client";
import Consultor360OriginalLogo from "@/assets/logo-original";
import Consultor360WordmarkLogo from "@/assets/logo-wordmark";
import Sider from "antd/es/layout/Sider";
import { ROUTES } from "@/constants/routes";
import React from "react";
import { Menu } from "antd";
import { useSidebarStore } from "@/stores/sidebar.store";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayoutSidebar() {
  const { collapsed, setCollapsed } = useSidebarStore();
  const path = usePathname();
  const router = useRouter();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      onCollapse={(collapsed, _) => {
        setCollapsed(collapsed);
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {collapsed ? (
        <Consultor360OriginalLogo
          style={{
            padding: "0 12px",
          }}
        />
      ) : (
        <Consultor360WordmarkLogo />
      )}
      <Menu
        theme="light"
        mode="vertical"
        defaultSelectedKeys={[path]}
        items={ROUTES}
        onClick={(e) => router.push(e.key)}
      />
    </Sider>
  );
}
