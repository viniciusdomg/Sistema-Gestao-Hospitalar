import { Atendimento } from "../domain/atendimento.schema";
import { atendimentosMock } from "../data/atendimento.mock";

type DataProvider = "memory" | "localstorage";

export interface AtendimentoService {
  list(): Promise<Atendimento[]>;
  create(novoAtendimento: Atendimento): Promise<Atendimento>;
  findByPacienteId(pacienteId: string): Promise<Atendimento[]>;
}

const STORAGE_KEY = "@liga/atendimentos";
const DEFAULT_DELAY_MS = 450;

function sleep(delayMs: number = DEFAULT_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

function cloneAtendimentos(atendimentos: Atendimento[]) {
  return atendimentos.map((atendimento) => ({ ...atendimento }));
}

function resolveProvider(): DataProvider {
  const provider = process.env.NEXT_PUBLIC_DATA_PROVIDER?.toLowerCase();
  if (provider === "localstorage" || provider === "local") {
    return "localstorage";
  }
  return "memory";
}

function createMemoryAtendimentoService(
  initialData: Atendimento[],
): AtendimentoService {
  let atendimentos = cloneAtendimentos(initialData);

  return {
    async list() {
      await sleep();
      return cloneAtendimentos(atendimentos);
    },
    async create(novoAtendimento) {
      await sleep();
      atendimentos = [...atendimentos, { ...novoAtendimento }];
      return { ...novoAtendimento };
    },
    async findByPacienteId(pacienteId) {
      await sleep();
      return cloneAtendimentos(
        atendimentos.filter((atendimento) => atendimento.pacienteId === pacienteId),
      );
    },
  };
}

function createLocalStorageAtendimentoService(
  initialData: Atendimento[],
): AtendimentoService {
  function read(): Atendimento[] {
    if (typeof window === "undefined") {
      return cloneAtendimentos(initialData);
    }

    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      write(initialData);
      return cloneAtendimentos(initialData);
    }

    try {
      const parsedValue = JSON.parse(rawValue) as Atendimento[];
      return cloneAtendimentos(parsedValue);
    } catch {
      write(initialData);
      return cloneAtendimentos(initialData);
    }
  }

  function write(atendimentos: Atendimento[]) {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(atendimentos));
  }

  return {
    async list() {
      await sleep();
      return read();
    },
    async create(novoAtendimento) {
      await sleep();
      const currentData = read();
      const updatedData = [...currentData, { ...novoAtendimento }];
      write(updatedData);
      return { ...novoAtendimento };
    },
    async findByPacienteId(pacienteId) {
      await sleep();
      const currentData = read();
      return cloneAtendimentos(
        currentData.filter((atendimento) => atendimento.pacienteId === pacienteId),
      );
    },
  };
}

function createAtendimentoService(): AtendimentoService {
  const provider = resolveProvider();
  if (provider === "localstorage") {
    return createLocalStorageAtendimentoService(atendimentosMock);
  }
  return createMemoryAtendimentoService(atendimentosMock);
}

export const atendimentoService = createAtendimentoService();
