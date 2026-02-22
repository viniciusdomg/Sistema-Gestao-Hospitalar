import { Paciente } from "../domain/paciente.schema";

export const pacientesMock: Paciente[] = [
    {
        id: "123e4567-e89b-12d3-a456-426614174000",
        nome: "João Silva",
        cpf: "111.222.333-44",
        dataNascimento: "1985-04-12T00:00:00.000Z",
        sexo: "Masculino"
    },
    {
        id: "987fcdeb-51a2-43d7-9012-3456789abcde",
        nome: "Maria Oliveira",
        cpf: "555.666.777-88",
        dataNascimento: "1992-08-25T00:00:00.000Z",
        sexo: "Feminino"
    }
];