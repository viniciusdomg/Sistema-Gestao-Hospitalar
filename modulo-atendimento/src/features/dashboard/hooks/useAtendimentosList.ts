"use client";
import { useState, useMemo, useEffect } from "react";
import { useAtendimentoStore } from "../../atendimentos/data/atendimento.store";
import { usePacienteStore } from "../../pacientes/data/paciente.store";

export interface AtendimentoListItem {
  id: string;
  pacienteNome: string;
  pacienteCpf: string;
  dataHora: string;
  tipo: string;
  status: string;
}

export function useAtendimentosList(itemsPerPage: number = 10) {
  const {
    atendimentos,
    isLoading: isLoadingAtendimentos,
    initialized: atendimentosInitialized,
    initialize: initializeAtendimentos,
  } = useAtendimentoStore();
  const {
    pacientes,
    isLoading: isLoadingPacientes,
    initialized: pacientesInitialized,
    initialize: initializePacientes,
  } = usePacienteStore();

  const [currentPage, setCurrentPage] = useState(1);

  const isLoading =
    isLoadingAtendimentos ||
    isLoadingPacientes ||
    !atendimentosInitialized ||
    !pacientesInitialized;

  useEffect(() => {
    if (!atendimentosInitialized) {
      void initializeAtendimentos();
    }
    if (!pacientesInitialized) {
      void initializePacientes();
    }
  }, [
    atendimentosInitialized,
    pacientesInitialized,
    initializeAtendimentos,
    initializePacientes,
  ]);

  const listaCompleta = useMemo(() => {
    return atendimentos
      .map((a) => {
        const paciente = pacientes.find((p) => p.id === a.pacienteId);

        return {
          id: a.id,
          pacienteNome: paciente ? paciente.nome : "Desconhecido",
          pacienteCpf: paciente ? paciente.cpf : "Desconhecido",
          dataHora: a.dataHora,
          tipo: a.tipo,
          status: a.status,
        };
      })
      .sort(
        (a, b) =>
          new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime(),
      );
  }, [atendimentos, pacientes]);

  const totalItems = listaCompleta.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const currentPageSafe = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPageSafe - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return listaCompleta.slice(startIndex, endIndex);
  }, [listaCompleta, currentPageSafe, itemsPerPage]);

  const nextPage = () => {
    if (currentPageSafe < totalPages) {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    }
  };

  const previousPage = () => {
    if (currentPageSafe > 1) {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  };

  return {
    data: paginatedData,
    currentPage: currentPageSafe,
    totalItems,
    itemsPerPage,
    nextPage,
    previousPage,
    isLoading,
  };
}
