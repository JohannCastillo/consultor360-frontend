"use client";
import { Button, Input, InputRef, Space, type TableColumnType } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { useSearchParamsMutation } from "../use-search-params";

export function useColumnSearchProps<T>(): {
  getColumnSearchProps: (dataIndex: keyof T) => TableColumnType<T>;
} {
  const [searchText, setSearchText] = useState<string>("");

  const searchInput = useRef<InputRef>(null);
  const { setSearchParams } = useSearchParamsMutation();

  const handleSearch = (dataIndex: keyof T) => {
    setSearchParams(String(dataIndex), searchText);
  };

  const handleReset = (dataIndex: string) => {
    setSearchParams(dataIndex, "");
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: keyof T): TableColumnType<T> => ({
    filterDropdown: ({ confirm, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Buscar por ${String(dataIndex)}`}
          value={searchText}
          onChange={(e) => {
            console.log("Buscando", e.target.value);
            setSearchText(e.target.value)
          }}
          onPressEnter={() => handleSearch(dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(String(dataIndex))}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
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
