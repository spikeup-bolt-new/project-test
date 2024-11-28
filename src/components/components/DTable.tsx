import { SearchOutlined } from "@ant-design/icons";
import { Input, Select, Table, TablePaginationConfig } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Actions } from "./Actions";
import { DEFAUL_PAGINATION } from "../../utils/const";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { Pagination } from "../../types";
import { omit, isEqual, cloneDeep } from "lodash";
import { filterParams } from "../../utils/helpers";

type RowClassName<T> = (record: T, index: number) => string;

interface DTableProps<T> {
  data: T[];
  columns: any[];
  pagination?: Pagination;
  rowClassName?: string | RowClassName<T> | undefined;
  fetchData?: (params: any) => void;
  onSearch?: (searchTerm: string) => void;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

const DTable = <T,>({
  data,
  columns,
  pagination = DEFAUL_PAGINATION,
  rowClassName,
  fetchData,
  onSearch,
  onView,
  onEdit,
  onDelete,
}: DTableProps<T>) => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredParams, setFilteredParams] = useState<Partial<Pagination & T>>(
    {}
  );
  const refFilteredParams = useRef<Partial<Pagination & T>>();

  const enhancedColumns = [
    ...columns
      .filter((column) => column.key !== "actions")
      .map((column) => {
        if (column.dataIndex) {
          return {
            ...column,
            sorter: true,
            filterDropdown: ({
              setSelectedKeys,
              selectedKeys,
              confirm,
              filters,
            }: any) => {
              const seperatedQuery = selectedKeys[0]?.split("___");
              const value = seperatedQuery?.[0];
              const operator = seperatedQuery?.[2];
              const type = column.dataType || "text";
              if (column.dataType === "select") {
                return (
                  <div style={{ padding: 8 }}>
                    <div style={{ marginBottom: 8 }}>
                      <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "150px" }}
                        placeholder="Please select"
                        value={value?.split(",")?.filter((v: any) => v)}
                        onChange={(value: any[]) =>
                          setSelectedKeys([`${value.join(",")}___${type}___in`])
                        }
                        options={filters || []}
                      />
                    </div>
                    <button
                      onClick={() => confirm()}
                      style={{
                        width: "100%",
                        background: "#1890ff",
                        color: "#fff",
                        border: "none",
                        padding: "5px",
                        borderRadius: "4px",
                      }}
                    >
                      Search
                    </button>
                  </div>
                );
              }
              return (
                <div style={{ padding: 8 }}>
                  <div style={{ marginBottom: 8 }}>
                    <select
                      value={operator || "eq"}
                      onChange={(e) =>
                        setSelectedKeys(
                          e.target.value
                            ? [
                                `${value || ""}___${type}___${
                                  e.target.value || "eq"
                                }`,
                              ]
                            : []
                        )
                      }
                      style={{
                        width: "100%",
                        padding: "4px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                      }}
                    >
                      {column.dataType !== "number" && (
                        <>
                          <option value="regex">Contains</option>
                          <option value="not">Does not contain</option>
                        </>
                      )}
                      <option value="eq">Equals</option>
                      <option value="ne">Does not equal</option>
                      {column.dataType === "number" && (
                        <>
                          <option value="lt">Less than</option>
                          <option value="lte">Less than or equal to</option>
                          <option value="gt">Greater than</option>
                          <option value="gte">Greater than or equal to</option>
                        </>
                      )}
                    </select>
                  </div>
                  <Input
                    placeholder={`Search ${column.title}`}
                    type={column.dataType || "text"}
                    value={selectedKeys[0]?.split("___")?.[0] || ""}
                    onChange={(e) =>
                      setSelectedKeys(
                        e.target.value
                          ? [
                              `${e.target.value}___${
                                column.dataType || "text"
                              }___${operator || "eq"}`,
                            ]
                          : []
                      )
                    }
                    onPressEnter={() => confirm()}
                    style={{ marginBottom: 8, display: "block" }}
                  />
                  <button
                    onClick={() => confirm()}
                    style={{
                      width: "100%",
                      background: "#1890ff",
                      color: "#fff",
                      border: "none",
                      padding: "5px",
                      borderRadius: "4px",
                    }}
                  >
                    Search
                  </button>
                </div>
              );
            },
            filterIcon: (filtered: boolean) => (
              <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
              />
            ),
          };
        }
        return column;
      }),
    {
      title: "Actions",
      key: "actions",
      render: (_text: string, record: T) => (
        <Actions
          record={record}
          additionalActions={columns.filter(
            (column) => column.key === "actions"
          )}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch?.(value);
  };

  const handleFetchData = useCallback(
    async (params: Partial<Pagination & T>) => {
      if (isEqual(params, refFilteredParams.current)) return;
      refFilteredParams.current = cloneDeep(params);
      const seperatedPagination = omit(params, ["total"]);
      setLoading(true);
      await fetchData?.(filterParams(seperatedPagination));
      setLoading(false);
    },
    [fetchData]
  );

  const handleOnChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[]
  ) => {
    let sort: string | undefined = undefined;

    if (Array.isArray(sorter)) {
      sort = sorter.map((s) => `${s.field}___${s.order}`).join(",");
    } else if (sorter?.field) {
      sort = `${sorter.field}___${sorter.order}`;
    }

    setFilteredParams((prev) => ({
      ...prev,
      ...(filters || {}),
      page: pagination.current,
      pageSize: pagination.pageSize,
      sort,
    }));
  };

  useEffect(() => {
    handleFetchData(filteredParams);
  }, [handleFetchData, filteredParams]);

  return (
    <div>
      {onSearch && (
        <div className="mb-4">
          <Input
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
            allowClear
          />
        </div>
      )}
      <Table
        columns={enhancedColumns}
        dataSource={data}
        pagination={pagination as TablePaginationConfig}
        loading={loading}
        rowKey="id"
        onChange={handleOnChange}
        scroll={{ x: "100%" }}
        rowClassName={rowClassName}
      />
    </div>
  );
};

export default DTable;
