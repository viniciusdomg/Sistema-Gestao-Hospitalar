import React from "react";
import { Column, Table } from "./Table";
import { TablePagination } from "./TablePagination";

interface TableWithPaginationProps<T> {
  columns: Column<T>[];
  data: T[];
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
  emptyMessage?: string;
  ariaLabel?: string;
}

export function TableWithPagination<T>({
  columns,
  data,
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPreviousPage,
  onNextPage,
  emptyMessage = "Nenhum registro encontrado.",
  ariaLabel = "Tabela de dados",
}: TableWithPaginationProps<T>) {
  return (
    <section
      className="w-full bg-surface border border-border rounded-xl shadow-sm overflow-hidden"
      aria-label={ariaLabel}
    >
      <Table
        columns={columns}
        data={data}
        emptyMessage={emptyMessage}
        ariaLabel={ariaLabel}
      />

      <TablePagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />
    </section>
  );
}
