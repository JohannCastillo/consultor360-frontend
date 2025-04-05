"use client";
import { THEME } from "@/constants/theme";
import { serverSignOut } from "@/modules/auth/services";
import { useSidebarStore } from "@/stores/sidebar.store";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Flex, Layout, Dropdown, Avatar, Skeleton } from "antd";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminLayoutHeader({
  colorBgContainer,
}: {
  colorBgContainer: string;
}) {
  const { data: session, status } = useSession();
  const { collapsed, setCollapsed } = useSidebarStore();

  return (
    <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
      <Flex
        style={{
          height: "100%",
          padding: "0 16px",
        }}
        align="center"
        justify="space-between"
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />

        {status === "authenticated" ? (
          <Dropdown
            menu={{
              items: [
                {
                  key: "username",
                  label: (
                    <Flex gap={2} align="center" justify="center">
                      <UserOutlined />
                      <span>{session.user.username}</span>
                    </Flex>
                  ),
                },
                {
                  key: "logout",
                  label: (
                    <Button danger type="text" onClick={async () => {
                      const res = await serverSignOut();
                      console.log("respuesta api", res)
                      signOut()
                    }}>
                      <span>Cerrar sesión</span>
                    </Button>
                  ),
                },
              ],
            }}
          >
            <Avatar
              size={32}
              alt="Usuario"
              style={{
                background: THEME.token.colorPrimary,
              }}
            >
              {session.user.username.charAt(0).toUpperCase()}
            </Avatar>
          </Dropdown>
        ) : status === "loading" ? (
          <SkeletonAvatar
            style={{
              display: "block",
            }}
            active
            size={32}
          />
        ) : (
          <Link href={"/login"}>
            <Button type="text">
              <span>Iniciar sesión</span>
            </Button>
          </Link>
        )}
      </Flex>
    </Layout.Header>
  );
}
