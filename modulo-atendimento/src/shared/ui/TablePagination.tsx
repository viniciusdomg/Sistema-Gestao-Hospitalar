import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface TablePaginationProps {
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
  ariaLabel?: string;
}

export function TablePagination({
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPreviousPage,
  onNextPage,
  ariaLabel = "Paginacao da tabela",
}: TablePaginationProps) {
  if (totalItems <= 0) {
    return null;
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <nav
      aria-label={ariaLabel}
      className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <p className="text-sm text-muted" aria-live="polite">
        A mostrar{" "}
        <span className="font-medium text-foreground">
          {startItem}-{endItem}
        </span>{" "}
        de <span className="font-medium text-foreground">{totalItems}</span>{" "}
        resultados
      </p>

      <div className="flex gap-2">
        <button
          onClick={onPreviousPage}
          disabled={currentPage <= 1}
          aria-label="Ir para a pagina anterior"
          className="px-4 py-2 rounded-lg border border-border text-muted hover:bg-background hover:text-foreground disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed text-xs font-semibold transition-colors flex items-center gap-1"
        >
          <FiChevronLeft className="text-sm" aria-hidden="true" /> Anterior
        </button>

        <button
          onClick={onNextPage}
          disabled={currentPage >= totalPages}
          aria-label="Ir para a pagina seguinte"
          className="px-4 py-2 rounded-lg border border-border text-muted hover:bg-background hover:text-foreground disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed text-xs font-semibold transition-colors flex items-center gap-1"
        >
          Seguinte <FiChevronRight className="text-sm" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
