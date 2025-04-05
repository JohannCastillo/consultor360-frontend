"use client";
/**
 * Handles table changes for pagination, sorting, and filtering
 * to update URL search params
 * */

import { useSearchParamsMutation } from "../use-search-params";
import type {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from "antd/es/table/interface";

type TableChangeHandlerProps<T> = {
  pagination: TablePaginationConfig; // To handle serverside pagination
  filter: Record<string, FilterValue | null>;
  sorter: SorterResult<T> | SorterResult<T>[]; // To handle serverside sorting
};

export function useTableParams<T>() {
  const { currentParams, setSearchParams } = useSearchParamsMutation();

  function handleFilterChange({
    filter,
  }: Pick<TableChangeHandlerProps<T>, "filter">) {
    Object.keys(filter).forEach((key) => {
      const value = filter[key];
      if (value) {
        setSearchParams(key, String(value));
      } else {
        // if was not filtered before, return
        if (!currentParams.has(key)) return;

        setSearchParams(key, "");
      }
    });
  }

  // TODO
  // function handleSortChange
  // function handlePaginationChange

  return {
    handleFilterChange,
  };
}
