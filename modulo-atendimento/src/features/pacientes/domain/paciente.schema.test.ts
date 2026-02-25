import { pacienteSchema } from "./paciente.schema";

describe("pacienteSchema", () => {
  const basePaciente = {
    id: "paciente-1",
    nome: "Paciente Teste",
    cpf: "12345678901",
    dataNascimento: "1990-05-10",
    sexo: "Masculino" as const,
  };

  it("valida paciente com cpf numerico de 11 digitos", () => {
    const result = pacienteSchema.safeParse(basePaciente);
    expect(result.success).toBe(true);
  });

  it("rejeita cpf com pontuacao", () => {
    const result = pacienteSchema.safeParse({
      ...basePaciente,
      cpf: "123.456.789-01",
    });

    expect(result.success).toBe(false);
  });

  it("rejeita cpf com tamanho diferente de 11", () => {
    const result = pacienteSchema.safeParse({
      ...basePaciente,
      cpf: "1234567890",
    });

    expect(result.success).toBe(false);
  });

  it("rejeita data de nascimento invalida", () => {
    const result = pacienteSchema.safeParse({
      ...basePaciente,
      dataNascimento: "data-invalida",
    });

    expect(result.success).toBe(false);
  });
});
