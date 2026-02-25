import { atendimentoBaseSchema } from "../../atendimentos/domain/atendimento.schema";
import { calculateDashboardMetrics } from "./dashboardMetrics.utils";

describe("calculateDashboardMetrics", () => {
  const [tipoAmbulatorial, tipoInternacao, tipoProntoSocorro] =
    atendimentoBaseSchema.shape.tipo.options;
  const [statusAguardando, statusEmAndamento, statusFinalizado] =
    atendimentoBaseSchema.shape.status.options;

  const referenceDate = new Date(2026, 1, 25, 12, 0, 0);

  it("calcula indicadores corretamente", () => {
    const atendimentos = [
      {
        tipo: tipoProntoSocorro,
        status: statusAguardando,
        dataHora: new Date(2026, 1, 25, 8, 0, 0).toISOString(),
      },
      {
        tipo: tipoInternacao,
        status: statusEmAndamento,
        dataHora: new Date(2026, 1, 25, 9, 30, 0).toISOString(),
      },
      {
        tipo: tipoAmbulatorial,
        status: statusFinalizado,
        dataHora: new Date(2026, 1, 24, 10, 0, 0).toISOString(),
      },
    ];

    const result = calculateDashboardMetrics(atendimentos, referenceDate);

    expect(result).toEqual({
      atendimentosHoje: 2,
      pacientesEmEspera: 1,
      internacoesAtivas: 1,
    });
  });

  it("retorna zeros quando nao ha atendimentos", () => {
    const result = calculateDashboardMetrics([], referenceDate);

    expect(result).toEqual({
      atendimentosHoje: 0,
      pacientesEmEspera: 0,
      internacoesAtivas: 0,
    });
  });
});
