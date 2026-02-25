import { pacientesMock } from "../data/pacientes.mock";
import { Paciente } from "../domain/paciente.schema";

type DataProvider = "memory" | "localstorage";

export interface PacienteService {
  list(): Promise<Paciente[]>;
  create(novoPaciente: Paciente): Promise<Paciente>;
  findByCpfOrName(cpf?: string, nome?: string): Promise<Paciente | null>;
}

const STORAGE_KEY = "@liga/pacientes";
const DEFAULT_DELAY_MS = 450;

function sleep(delayMs: number = DEFAULT_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

function clonePacientes(pacientes: Paciente[]) {
  return pacientes.map((paciente) => ({ ...paciente }));
}

function normalize(value?: string) {
  return value?.trim().toLowerCase() ?? "";
}

function normalizeCpf(value?: string) {
  return value?.replace(/\D/g, "") ?? "";
}

function resolveProvider(): DataProvider {
  const provider = process.env.NEXT_PUBLIC_DATA_PROVIDER?.toLowerCase();
  if (provider === "localstorage" || provider === "local") {
    return "localstorage";
  }
  return "memory";
}

function createMemoryPacienteService(initialData: Paciente[]): PacienteService {
  let pacientes = clonePacientes(initialData);

  return {
    async list() {
      await sleep();
      return clonePacientes(pacientes);
    },
    async create(novoPaciente) {
      await sleep();
      pacientes = [...pacientes, { ...novoPaciente }];
      return { ...novoPaciente };
    },
    async findByCpfOrName(cpf, nome) {
      await sleep();
      const normalizedCpf = normalizeCpf(cpf);
      const normalizedName = normalize(nome);

      const foundPaciente =
        pacientes.find(
          (paciente) =>
            (normalizedCpf && normalizeCpf(paciente.cpf) === normalizedCpf) ||
            (normalizedName && normalize(paciente.nome) === normalizedName),
        ) ?? null;

      return foundPaciente ? { ...foundPaciente } : null;
    },
  };
}

function createLocalStoragePacienteService(
  initialData: Paciente[],
): PacienteService {
  function read(): Paciente[] {
    if (typeof window === "undefined") {
      return clonePacientes(initialData);
    }

    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      write(initialData);
      return clonePacientes(initialData);
    }

    try {
      const parsedValue = JSON.parse(rawValue) as Paciente[];
      return clonePacientes(parsedValue);
    } catch {
      write(initialData);
      return clonePacientes(initialData);
    }
  }

  function write(pacientes: Paciente[]) {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pacientes));
  }

  return {
    async list() {
      await sleep();
      return read();
    },
    async create(novoPaciente) {
      await sleep();
      const currentData = read();
      const updatedData = [...currentData, { ...novoPaciente }];
      write(updatedData);
      return { ...novoPaciente };
    },
    async findByCpfOrName(cpf, nome) {
      await sleep();
      const normalizedCpf = normalizeCpf(cpf);
      const normalizedName = normalize(nome);
      const currentData = read();

      const foundPaciente =
        currentData.find(
          (paciente) =>
            (normalizedCpf && normalizeCpf(paciente.cpf) === normalizedCpf) ||
            (normalizedName && normalize(paciente.nome) === normalizedName),
        ) ?? null;

      return foundPaciente ? { ...foundPaciente } : null;
    },
  };
}

function createPacienteService(): PacienteService {
  const provider = resolveProvider();
  if (provider === "localstorage") {
    return createLocalStoragePacienteService(pacientesMock);
  }
  return createMemoryPacienteService(pacientesMock);
}

export const pacienteService = createPacienteService();
