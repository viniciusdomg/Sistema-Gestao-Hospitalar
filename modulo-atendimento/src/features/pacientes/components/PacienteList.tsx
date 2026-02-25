"use client";

import { useState, useMemo, useEffect } from "react";
import { usePacienteStore } from "../data/paciente.store";
import { Paciente } from "../domain/paciente.schema";

import { TableWithPagination } from "@/src/shared/ui/table/TableWithPagination";
import { Column } from "@/src/shared/ui/table/Table";
import { PacienteBarraBusca } from "./PacienteBarraBusca";

export default function PacienteList() {
  const { pacientes, isLoading, initialized, initialize } = usePacienteStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!initialized) {
      void initialize();
    }
  }, [initialized, initialize]);

  const filteredPacientes = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return pacientes;

    return pacientes.filter((paciente) => {
      const matchNome = paciente.nome.toLowerCase().includes(term);
      const cleanCpf = paciente.cpf.replace(/\D/g, "");
      const cleanTerm = term.replace(/\D/g, "");
      const matchCpf =
        cleanTerm !== ""
          ? cleanCpf.includes(cleanTerm)
          : paciente.cpf.includes(term);

      return matchNome || matchCpf;
    });
  }, [pacientes, searchTerm]);

  const totalItems = filteredPacientes.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const currentPageSafe = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPageSafe - 1) * itemsPerPage;
    return filteredPacientes.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPacientes, currentPageSafe, itemsPerPage]);

  const columns: Column<Paciente>[] = [
    {
      header: "Paciente",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase"
            aria-hidden="true"
          >
            {item.nome.substring(0, 2)}
          </div>
          <span className="font-medium text-foreground">{item.nome}</span>
        </div>
      ),
    },
    {
      header: "CPF",
      cell: (item) => (
        <span className="font-mono text-xs text-muted">{item.cpf}</span>
      ),
    },
    {
      header: "Data de Nasc.",
      cell: (item) => {
        try {
          const date = new Date(
            item.dataNascimento.split("T")[0] + "T12:00:00",
          );
          return (
            <span className="text-foreground">
              {date.toLocaleDateString("pt-BR")}
            </span>
          );
        } catch {
          return "Data inválida";
        }
      },
    },
    {
      header: "Identidade de Género",
      accessorKey: "sexo",
    },
  ];

  if (isLoading && !initialized) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-16 bg-surface rounded-xl border border-border"></div>
        <div className="h-64 bg-surface rounded-xl border border-border"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PacienteBarraBusca
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />

      <section aria-labelledby="lista-pacientes-title">
        <h2 id="lista-pacientes-title" className="sr-only">
          Resultados da busca de pacientes
        </h2>

        <TableWithPagination
          columns={columns}
          data={paginatedData}
          currentPage={currentPageSafe}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onNextPage={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          onPreviousPage={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          emptyMessage={
            searchTerm
              ? `Nenhum paciente encontrado com "${searchTerm}".`
              : "Não há pacientes registados no sistema."
          }
          ariaLabel="Tabela de pacientes"
        />
      </section>
    </div>
  );
}
