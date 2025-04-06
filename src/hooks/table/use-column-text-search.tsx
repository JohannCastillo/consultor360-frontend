"use client";
import { Button, Input, InputRef, Space, type TableColumnType } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRef } from "react";
import { FilterDropdownProps } from "antd/es/table/interface";

export function useColumnTextSearch<T>(): {
  getColumnSearchProps: (dataIndex: keyof T) => TableColumnType<T>;
} {
  const searchInput = useRef<InputRef>(null);

  const handleClearFilters = (
    confirm: FilterDropdownProps["confirm"],
    clearFilters?: FilterDropdownProps["clearFilters"]
  ) => {
    if(clearFilters){
      clearFilters();
    }
    confirm();
  };

  const getColumnSearchProps = (dataIndex: keyof T): TableColumnType<T> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => {
      return (
        <div
          style={{ padding: 8 }}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
        >
          <Input
            ref={searchInput}
            placeholder={`Buscar por ${String(String(dataIndex))}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Buscar
            </Button>
            <Button
              onClick={() => handleClearFilters(confirm, clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Limpiar
            </Button>

            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              Cerrar
            </Button>
          </Space>
        </div>
      );
    },
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) => text,
  });

  return { getColumnSearchProps };
}
