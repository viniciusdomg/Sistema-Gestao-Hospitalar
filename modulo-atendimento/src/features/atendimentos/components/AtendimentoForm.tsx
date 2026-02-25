"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  atendimentoFormSchema,
  Atendimento,
  AtendimentoFormInput,
} from "../domain/atendimento.schema";
import { useAtendimentoStore } from "../data/atendimento.store";
import { usePacienteStore } from "../../pacientes/data/paciente.store";

import { Input } from "@/src/shared/ui/form/Input";
import { Select } from "@/src/shared/ui/form/Select";
import { Form } from "@/src/shared/ui/form/Form";
import { Button } from "@/src/shared/ui/buttons/Button";
import { RadioGroup } from "@/src/shared/ui/form/RadioGroup";
import { RadioCard } from "@/src/shared/ui/form/RadioCard";

import {
  MdMedicalServices,
  MdPerson,
  MdAccessTime,
  MdInfoOutline,
  MdLocalHospital,
  MdExpandMore,
  MdCheckCircle,
  MdWarning,
  MdPriorityHigh,
  MdInfo,
} from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";

export default function AtendimentoForm() {
  const { adicionarAtendimento } = useAtendimentoStore();
  const { pacientes, initialized, initialize } = usePacienteStore();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!initialized) {
      void initialize();
    }
  }, [initialized, initialize]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AtendimentoFormInput>({
    resolver: zodResolver(atendimentoFormSchema),
    defaultValues: {
      status: "Aguardando",
      dataHora: new Date().toISOString().slice(0, 16),
    },
  });

  const tipoSelecionado = useWatch({ control, name: "tipo" });

  const onSubmit = async (data: AtendimentoFormInput) => {
    setSuccessMessage("");
    setErrorMessage("");

    const novoAtendimento: Atendimento = {
      ...data,
      id: crypto.randomUUID(),
    };

    try {
      await adicionarAtendimento(novoAtendimento);
      setSuccessMessage("Atendimento registado com sucesso!");
      reset({
        status: "Aguardando",
        dataHora: new Date().toISOString().slice(0, 16),
      });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      setErrorMessage(
        "Nao foi possivel registrar o atendimento. Tente novamente.",
      );
    }
  };

  const pacientesOptions = pacientes.map((p) => ({
    label: `${p.nome} (CPF: ${p.cpf})`,
    value: p.id,
  }));

  return (
    <section
      className="bg-surface border border-border rounded-xl shadow-sm w-full max-w-3xl"
      aria-labelledby="form-atendimento-title"
    >
      <header className="p-6 border-b border-border bg-linear-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-4">
          <div
            className="size-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20"
            aria-hidden="true"
          >
            <MdMedicalServices className="text-xl" />
          </div>
          <div>
            <h2
              id="form-atendimento-title"
              className="text-2xl font-extrabold text-foreground"
            >
              Registar Atendimento
            </h2>
            <p className="text-muted text-sm mt-0.5">
              Vincule um paciente e defina as diretrizes clínicas.
            </p>
          </div>
        </div>
      </header>

      {successMessage && (
        <div
          className="mx-8 mt-6 p-4 bg-success/10 border border-success/20 text-success rounded-xl font-medium text-sm flex items-center gap-2"
          role="alert"
        >
          <MdCheckCircle className="text-lg" aria-hidden="true" />
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          className="mx-8 mt-6 p-4 bg-danger/10 border border-danger/20 text-danger rounded-xl font-medium text-sm"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {pacientes.length === 0 && initialized && (
        <div
          className="mx-8 mt-6 p-4 bg-warning/10 border border-warning/20 text-warning rounded-xl font-medium text-sm flex items-center gap-2"
          role="alert"
        >
          <MdWarning className="text-lg" aria-hidden="true" />
          Nenhum paciente cadastrado. Aceda à aba Pacientes para registar o
          primeiro.
        </div>
      )}

      <Form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
        <Select
          label="Paciente"
          icon={<MdPerson className="text-muted" />}
          iconExpand={<MdExpandMore className="text-muted" />}
          options={pacientesOptions}
          disabled={pacientes.length === 0}
          {...register("pacienteId")}
          error={errors.pacienteId?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Tipo de Atendimento"
            icon={<MdMedicalServices className="text-muted" />}
            iconExpand={<MdExpandMore className="text-muted" />}
            options={[
              { label: "Ambulatorial", value: "Ambulatorial" },
              { label: "Internação", value: "Internação" },
              { label: "Pronto Socorro", value: "Pronto Socorro" },
            ]}
            {...register("tipo")}
            error={errors.tipo?.message}
          />

          <Select
            label="Status Inicial"
            icon={<MdInfoOutline className="text-muted" />}
            iconExpand={<MdExpandMore className="text-muted" />}
            options={[
              { label: "Aguardando", value: "Aguardando" },
              { label: "Em Andamento", value: "Em Andamento" },
              { label: "Finalizado", value: "Finalizado" },
            ]}
            {...register("status")}
            error={errors.status?.message}
          />
        </div>

        <Input
          label="Data e Hora de Entrada"
          type="datetime-local"
          icon={<MdAccessTime className="text-muted" />}
          {...register("dataHora")}
          error={errors.dataHora?.message}
        />

        {tipoSelecionado === "Pronto Socorro" && (
          <div className="p-6 rounded-xl border border-border bg-background space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-danger"></span>{" "}
              Classificação de Risco (Triagem)
            </h3>

            <RadioGroup
              error={errors.nivelUrgencia?.message}
              className="grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
            >
              <RadioCard
                value="Vermelho"
                label="Emergência"
                subLabel="0 Min"
                colorTheme="red"
                icon={<FaHeartbeat />}
                {...register("nivelUrgencia")}
              />
              <RadioCard
                value="Laranja"
                label="Mto Urgente"
                subLabel="10 Min"
                colorTheme="orange"
                icon={<MdWarning />}
                {...register("nivelUrgencia")}
              />
              <RadioCard
                value="Amarelo"
                label="Urgente"
                subLabel="60 Min"
                colorTheme="yellow"
                icon={<MdPriorityHigh />}
                {...register("nivelUrgencia")}
              />
              <RadioCard
                value="Verde"
                label="Pouco Urgente"
                subLabel="120 Min"
                colorTheme="green"
                icon={<MdCheckCircle />}
                {...register("nivelUrgencia")}
              />
              <RadioCard
                value="Azul"
                label="Não Urgente"
                subLabel="240 Min"
                colorTheme="blue"
                icon={<MdInfo />}
                {...register("nivelUrgencia")}
              />
            </RadioGroup>

            <Input
              label="Queixa Principal"
              placeholder="Ex: Dor no peito intensa, falta de ar..."
              {...register("queixaPrincipal")}
              error={errors.queixaPrincipal?.message}
            />
          </div>
        )}

        {tipoSelecionado === "Internação" && (
          <div className="p-6 rounded-xl border border-border bg-background space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Dados de
              Acomodação
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Setor de Internação"
                placeholder="Ex: UTI Cardiológica"
                icon={<MdLocalHospital className="text-muted" />}
                {...register("setorInternacao")}
                error={errors.setorInternacao?.message}
              />
              <Input
                label="Leito"
                placeholder="Ex: Leito 402 - B"
                {...register("leito")}
                error={errors.leito?.message}
              />
            </div>
          </div>
        )}

        <div className="pt-6 flex flex-col sm:flex-row gap-3 border-t border-border">
          <Button
            type="submit"
            disabled={isSubmitting || pacientes.length === 0}
            className="flex-1"
          >
            {isSubmitting ? "A registar..." : "Salvar Atendimento"}
          </Button>
          <Button
            type="button"
            onClick={() => reset()}
            disabled={isSubmitting}
            variant="secondary"
            className="flex-1"
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </section>
  );
}
