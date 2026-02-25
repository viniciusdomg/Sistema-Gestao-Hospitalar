import { z } from "zod";

export const atendimentoBaseSchema = z.object({
  id: z.string(),
  pacienteId: z.string().min(1, "O paciente é obrigatório"),
  tipo: z.enum(["Ambulatorial", "Internação", "Pronto Socorro"]),
  status: z.enum(["Aguardando", "Em Andamento", "Finalizado"]),
  dataHora: z.string().refine((date) => !Number.isNaN(Date.parse(date)), {
    message: "Data e hora inválida",
  }),
  nivelUrgencia: z
    .enum(["Vermelho", "Laranja", "Amarelo", "Verde", "Azul"])
    .optional(),
  queixaPrincipal: z.string().optional(),
  leito: z.string().optional(),
  setorInternacao: z.string().optional(),
});

type AtendimentoBase = z.infer<typeof atendimentoBaseSchema>;

function validarCamposCondicionais(
  data: Partial<AtendimentoBase>,
  ctx: z.RefinementCtx,
) {
  if (data.tipo === "Pronto Socorro") {
    if (!data.nivelUrgencia) {
      ctx.addIssue({
        code: "custom",
        path: ["nivelUrgencia"],
        message: "A cor de triagem é obrigatória",
      });
    }

    if (!data.queixaPrincipal?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["queixaPrincipal"],
        message: "A queixa principal é obrigatória",
      });
    }
  }

  if (data.tipo === "Internação") {
    if (!data.leito?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["leito"],
        message: "O número do leito é obrigatório",
      });
    }

    if (!data.setorInternacao?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["setorInternacao"],
        message: "O setor de internação é obrigatório",
      });
    }
  }
}

export const atendimentoSchema = atendimentoBaseSchema.superRefine(
  validarCamposCondicionais,
);

export const atendimentoFormSchema = atendimentoBaseSchema
  .omit({ id: true })
  .superRefine(validarCamposCondicionais);

export type Atendimento = z.infer<typeof atendimentoSchema>;
export type AtendimentoFormInput = z.infer<typeof atendimentoFormSchema>;
