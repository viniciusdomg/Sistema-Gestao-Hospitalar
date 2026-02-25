import { create } from "zustand";
import AtendimentoState from "./atendimento.state";
import { atendimentoService } from "../services/atendimento.service";

export const useAtendimentoStore = create<AtendimentoState>()((set, get) => ({
  atendimentos: [],
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
      const atendimentos = await atendimentoService.list();
      set({
        atendimentos,
        initialized: true,
        isLoading: false,
        error: null,
      });
    } catch {
      set({
        isLoading: false,
        error: "Nao foi possivel carregar os atendimentos.",
      });
    }
  },

  adicionarAtendimento: async (novoAtendimento) => {
    set({ isLoading: true, error: null });
    try {
      const atendimentoCriado =
        await atendimentoService.create(novoAtendimento);
      set((state) => ({
        atendimentos: [...state.atendimentos, atendimentoCriado],
        isLoading: false,
        error: null,
      }));
    } catch {
      const message = "Nao foi possivel registrar o atendimento.";
      set({
        isLoading: false,
        error: message,
      });
      throw new Error(message);
    }
  },

  buscarByPacienteId: async (pacienteId) => {
    try {
      return await atendimentoService.findByPacienteId(pacienteId);
    } catch {
      set({ error: "Nao foi possivel buscar os atendimentos do paciente." });
      return [];
    }
  },
}));
