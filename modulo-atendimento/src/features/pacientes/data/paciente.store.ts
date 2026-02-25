import PacienteState from "./paciente.state";
import { create } from "zustand";
import { pacienteService } from "../services/paciente.service";

export const usePacienteStore = create<PacienteState>()((set, get) => ({
  pacientes: [],
  isLoading: false,
  initialized: false,
  error: null,

  initialize: async () => {
    const { initialized, isLoading } = get();
    if (initialized || isLoading) {
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const pacientes = await pacienteService.list();
      set({
        pacientes,
        initialized: true,
        isLoading: false,
        error: null,
      });
    } catch {
      set({
        isLoading: false,
        error: "Nao foi possivel carregar os pacientes.",
      });
    }
  },

  adicionarPaciente: async (novoPaciente) => {
    set({ isLoading: true, error: null });
    try {
      const pacienteCriado = await pacienteService.create(novoPaciente);
      set((state) => ({
        pacientes: [...state.pacientes, pacienteCriado],
        isLoading: false,
        error: null,
      }));
    } catch {
      const message = "Nao foi possivel cadastrar o paciente.";
      set({
        isLoading: false,
        error: message,
      });
      throw new Error(message);
    }
  },

  buscarByCpfOrName: async (cpf?: string, nome?: string) => {
    try {
      return await pacienteService.findByCpfOrName(cpf, nome);
    } catch {
      set({ error: "Nao foi possivel buscar o paciente." });
      return null;
    }
  },
}));
