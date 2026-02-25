import { Atendimento } from "../../atendimentos/domain/atendimento.schema";

export type DashboardMetricInput = Pick<Atendimento, "dataHora" | "status" | "tipo">;

export interface DashboardMetrics {
  atendimentosHoje: number;
  pacientesEmEspera: number;
  internacoesAtivas: number;
}

export function calculateDashboardMetrics(
  atendimentos: DashboardMetricInput[],
  referenceDate: Date = new Date(),
): DashboardMetrics {
  const hoje = referenceDate.toDateString();

  const atendimentosHoje = atendimentos.filter(
    (atendimento) => new Date(atendimento.dataHora).toDateString() === hoje,
  ).length;

  const pacientesEmEspera = atendimentos.filter(
    (atendimento) => atendimento.status === "Aguardando",
  ).length;

  const internacoesAtivas = atendimentos.filter(
    (atendimento) =>
      atendimento.tipo === "Internação" && atendimento.status === "Em Andamento",
  ).length;

  return {
    atendimentosHoje,
    pacientesEmEspera,
    internacoesAtivas,
  };
}
