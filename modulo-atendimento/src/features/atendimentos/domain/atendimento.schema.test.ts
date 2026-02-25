import {
  atendimentoBaseSchema,
  atendimentoFormSchema,
} from "./atendimento.schema";

describe("atendimentoFormSchema", () => {
  const tipoOptions = atendimentoBaseSchema.shape.tipo.options;
  const statusOptions = atendimentoBaseSchema.shape.status.options;

  const baseData = {
    pacienteId: "paciente-1",
    tipo: tipoOptions[0],
    status: statusOptions[0],
    dataHora: new Date(2026, 1, 25, 10, 0, 0).toISOString(),
  };

  it("valida atendimento pronto socorro quando campos obrigatorios sao informados", () => {
    const result = atendimentoFormSchema.safeParse({
      ...baseData,
      tipo: tipoOptions[2],
      nivelUrgencia: "Amarelo",
      queixaPrincipal: "Dor toracica",
    });

    expect(result.success).toBe(true);
  });

  it("rejeita pronto socorro sem nivelUrgencia e queixaPrincipal", () => {
    const result = atendimentoFormSchema.safeParse({
      ...baseData,
      tipo: tipoOptions[2],
      queixaPrincipal: " ",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join("."));
      expect(paths).toContain("nivelUrgencia");
      expect(paths).toContain("queixaPrincipal");
    }
  });

  it("rejeita internacao sem leito e setorInternacao", () => {
    const result = atendimentoFormSchema.safeParse({
      ...baseData,
      tipo: tipoOptions[1],
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join("."));
      expect(paths).toContain("leito");
      expect(paths).toContain("setorInternacao");
    }
  });

  it("valida ambulatorial sem campos condicionais", () => {
    const result = atendimentoFormSchema.safeParse({
      ...baseData,
      tipo: tipoOptions[0],
      status: statusOptions[2],
    });

    expect(result.success).toBe(true);
  });
});
