"use client";
import { Column } from "@/src/shared/ui/table/Table";
import { TableWithPagination } from "@/src/shared/ui/table/TableWithPagination";
import {
  useAtendimentosList,
  AtendimentoListItem,
} from "../hooks/useAtendimentosList";

export function AtendimentosList() {
  const {
    data,
    currentPage,
    totalItems,
    itemsPerPage,
    nextPage,
    previousPage,
    isLoading,
  } = useAtendimentosList(5);

  const columns: Column<AtendimentoListItem>[] = [
    {
      header: "Paciente",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
            {item.pacienteNome.substring(0, 2)}
          </div>
          <span className="font-medium text-foreground">
            {item.pacienteNome}
          </span>
        </div>
      ),
    },
    {
      header: "CPF",
      cell: (item) => (
        <span className="font-mono text-xs text-muted">{item.pacienteCpf}</span>
      ),
    },
    {
      header: "Tipo",
      accessorKey: "tipo",
    },
    {
      header: "Data / Hora",
      cell: (item) => {
        const date = new Date(item.dataHora);
        return (
          <div className="flex flex-col">
            <span className="text-foreground font-medium">
              {date.toLocaleDateString("pt-PT")}
            </span>
            <span className="text-xs text-muted">
              {date.toLocaleTimeString("pt-PT", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        );
      },
    },
    {
      header: "Status",
      cell: (item) => {
        let badgeStyle = "";
        let dotStyle = "";

        switch (item.status) {
          case "Aguardando":
            badgeStyle = "bg-warning/10 text-warning border-warning/20";
            dotStyle = "bg-warning";
            break;
          case "Em Andamento":
            badgeStyle = "bg-primary/10 text-primary border-primary/20";
            dotStyle = "bg-primary";
            break;
          case "Finalizado":
            badgeStyle = "bg-success/10 text-success border-success/20";
            dotStyle = "bg-success";
            break;
          default:
            badgeStyle = "bg-surface text-muted border-border";
            dotStyle = "bg-muted";
        }

        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${badgeStyle}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`}></span>
            {item.status}
          </span>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <section
        className="mb-8"
        aria-label="Tabela da listagem geral dos atendimentos"
      >
        <div className="w-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
          <div className="animate-pulse space-y-3 p-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`atendimento-skeleton-${index}`}
                className="grid grid-cols-5 gap-4"
              >
                <div className="h-4 rounded bg-background" />
                <div className="h-4 rounded bg-background" />
                <div className="h-4 rounded bg-background" />
                <div className="h-4 rounded bg-background" />
                <div className="h-4 rounded bg-background" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="mb-8"
      aria-label="Tabela da listagem geral dos atendimentos"
    >
      <TableWithPagination
        columns={columns}
        data={data}
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onNextPage={nextPage}
        onPreviousPage={previousPage}
        emptyMessage="Nenhum atendimento recente encontrado."
        ariaLabel="Lista geral de atendimentos"
      />
    </section>
  );
}
