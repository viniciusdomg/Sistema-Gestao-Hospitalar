import React, { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  ariaLabel?: string;
}

export function Table<T>({
  columns,
  data,
  emptyMessage = "Nenhum registro encontrado.",
  ariaLabel = "Tabela de dados",
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-muted" aria-label={ariaLabel}>
        <thead className="bg-background text-xs uppercase text-muted font-semibold border-b border-border">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-4" scope="col">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-muted">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-background transition-colors group">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    {col.cell
                      ? col.cell(item)
                      : col.accessorKey
                        ? String(item[col.accessorKey] ?? "")
                        : null}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
