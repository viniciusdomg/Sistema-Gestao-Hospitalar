"use client";

import { useEffect } from "react";
import { useAtendimentoStore } from "../../atendimentos/data/atendimento.store";
import { calculateDashboardMetrics } from "./dashboardMetrics.utils";

export function useDashboardMetrics() {
  const { atendimentos, isLoading, initialized, initialize } = useAtendimentoStore();

  useEffect(() => {
    if (!initialized) {
      void initialize();
    }
  }, [initialized, initialize]);

  const { atendimentosHoje, pacientesEmEspera, internacoesAtivas } =
    calculateDashboardMetrics(atendimentos);

  return {
    atendimentosHoje,
    pacientesEmEspera,
    internacoesAtivas,
    isLoading: isLoading || !initialized,
  };
}
