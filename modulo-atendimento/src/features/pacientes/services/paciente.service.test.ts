import type { PacienteService } from "./paciente.service";

function loadMemoryPacienteService(): PacienteService {
  jest.resetModules();
  process.env.NEXT_PUBLIC_DATA_PROVIDER = "memory";
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const moduleRef = require("./paciente.service") as {
    pacienteService: PacienteService;
  };
  return moduleRef.pacienteService;
}

describe("pacienteService.findByCpfOrName", () => {
  it("encontra paciente por nome ignorando maiusculas/minusculas e espacos", async () => {
    const service = loadMemoryPacienteService();

    const paciente = await service.findByCpfOrName(undefined, "  maria oliveira  ");

    expect(paciente).not.toBeNull();
    expect(paciente?.nome).toBe("Maria Oliveira");
  });

  it("encontra paciente por CPF mesmo com mascara", async () => {
    const service = loadMemoryPacienteService();

    const paciente = await service.findByCpfOrName("555.666.777-88");

    expect(paciente).not.toBeNull();
    expect(paciente?.cpf).toBe("55566677788");
  });

  it("retorna null quando paciente nao existe", async () => {
    const service = loadMemoryPacienteService();

    const paciente = await service.findByCpfOrName("00000000000", "Inexistente");

    expect(paciente).toBeNull();
  });
});
