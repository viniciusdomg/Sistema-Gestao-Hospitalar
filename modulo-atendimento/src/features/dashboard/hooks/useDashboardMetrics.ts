"use client";
import { useEffect } from "react";
import { useAtendimentoStore } from "../../atendimentos/data/atendimento.store";

export function useDashboardMetrics() {
  const {
    atendimentos,
    isLoading,
    initialized,
    initialize,
  } = useAtendimentoStore();

  useEffect(() => {
    if (!initialized) {
      void initialize();
    }
  }, [initialized, initialize]);

  const hoje = new Date().toDateString();

  const atendimentosHoje = atendimentos.filter(
    (a) => new Date(a.dataHora).toDateString() === hoje,
  ).length;

  const pacientesEmEspera = atendimentos.filter(
    (a) => a.status === "Aguardando",
  ).length;

  const internacoesAtivas = atendimentos.filter(
    (a) => a.tipo === "Internação" && a.status === "Em Andamento",
  ).length;

  return {
    atendimentosHoje,
    pacientesEmEspera,
    internacoesAtivas,
    isLoading: isLoading || !initialized,
  };
}
