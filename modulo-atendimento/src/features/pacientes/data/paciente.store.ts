import PacienteState from "./paciente.state";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { pacientesMock } from "./pacientes.mock";

export const usePacienteStore = create<PacienteState>()(
    persist(
        (set, get) => ({
            pacientes: pacientesMock,

            adicionarPaciente: (novoPaciente) => {
                set((state) => ({
                    pacientes: [...state.pacientes, novoPaciente]
                }));
            },

            buscarByCpfOrName: (cpf?: string, nome?: string) => {
                const { pacientes } = get(); 
                
                return pacientes.find(p => 
                    (cpf && p.cpf === cpf) || 
                    (nome && p.nome.toLowerCase() === nome.toLowerCase())
                ) || null;
            }
        }),
        {
            name: '@liga/pacientes',
        }
    )
);
