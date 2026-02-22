import { create } from "zustand";
import { persist } from "zustand/middleware";
import AtendimentoState from "./atendimento.state";
import { atendimentosMock } from "./atendimento.mock";

export const useAtendimentoStore = create<AtendimentoState>()(
    persist(
        (set, get) => ({
            atendimentos: atendimentosMock,
            adicionarAtendimento: (novoAtendimento) => {
                set((state) => ({
                    atendimentos: [...state.atendimentos, novoAtendimento]
                }));
            },
            buscarByPacienteId: (pacienteId) => {
                const { atendimentos } = get();
                return atendimentos.filter(a => a.pacienteId === pacienteId);
            }
        }),
        {
            name: '@liga/atendimentos',
        }
    )
); 