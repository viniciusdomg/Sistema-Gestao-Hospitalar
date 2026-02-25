"use client";

import { FiActivity, FiCalendar, FiClock } from "react-icons/fi";
import IndicatorCard from "@/src/shared/ui/cards/IndicatorCard";
import { useDashboardMetrics } from "../hooks/useDashboardMetrics";

function Indicadores() {
  const { atendimentosHoje, pacientesEmEspera, internacoesAtivas, isLoading } =
    useDashboardMetrics();

  const atendimentosHojeValue = isLoading ? "..." : atendimentosHoje;
  const pacientesEmEsperaValue = isLoading ? "..." : pacientesEmEspera;
  const internacoesAtivasValue = isLoading ? "..." : internacoesAtivas;

  return (
    <section
      className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
      aria-label="Indicadores principais do hospital"
    >
      <IndicatorCard
        title="Total de Atendimentos Hoje"
        value={atendimentosHojeValue}
        icon={<FiCalendar />}
        colorScheme="primary"
        trend={{
          value: "Atualizado",
          label: "agora mesmo",
          direction: "neutral",
        }}
      />

      <IndicatorCard
        title="Pacientes em Espera"
        value={pacientesEmEsperaValue}
        icon={<FiClock />}
        colorScheme="warning"
        trend={{
          value: "Atencao",
          label: "necessaria na triagem",
          direction: "up",
        }}
      />

      <IndicatorCard
        title="Internacoes Ativas"
        value={internacoesAtivasValue}
        icon={<FiActivity />}
        colorScheme="danger"
        trend={{
          value: "Monitorizacao",
          label: "ocupacao de leitos",
          direction: "neutral",
        }}
      />
    </section>
  );
}

export default Indicadores;
