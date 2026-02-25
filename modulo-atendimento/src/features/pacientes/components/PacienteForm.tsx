"use client";

import { FaPerson, FaFingerprint, FaCalendarDay } from "react-icons/fa6";
import { BsPersonAdd } from "react-icons/bs";
import { MdWc, MdExpandMore, MdCheckCircle } from "react-icons/md";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pacienteSchema, Paciente } from "../domain/paciente.schema";
import { usePacienteStore } from "../data/paciente.store";
import { Input } from "@/src/shared/ui/form/Input";
import { Button } from "@/src/shared/ui/buttons/Button";
import { Form } from "@/src/shared/ui/form/Form";
import { Select } from "@/src/shared/ui/form/Select";

type PacienteFormData = Omit<Paciente, "id">;

export default function PacienteForm() {
  const { adicionarPaciente } = usePacienteStore();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PacienteFormData>({
    resolver: zodResolver(pacienteSchema.omit({ id: true })),
  });

  const onSubmit = async (data: PacienteFormData) => {
    setSuccessMessage("");
    setErrorMessage("");

    const novoPaciente: Paciente = {
      ...data,
      id: crypto.randomUUID(),
    };

    try {
      await adicionarPaciente(novoPaciente);
      setSuccessMessage("Paciente cadastrado com sucesso!");
      reset();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch {
      setErrorMessage(
        "Nao foi possivel cadastrar o paciente. Tente novamente.",
      );
    }
  };

  return (
    <section
      className="bg-surface border border-border rounded-xl shadow-sm w-full max-w-2xl"
      aria-labelledby="form-title"
    >
      <header className="p-6 border-b border-border bg-linear-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-4">
          <div
            className="size-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20"
            aria-hidden="true"
          >
            <BsPersonAdd className="text-xl" />
          </div>
          <div>
            <h2
              id="form-title"
              className="text-2xl font-extrabold text-foreground"
            >
              Registar Novo Paciente
            </h2>
            <p className="text-muted text-sm mt-0.5">
              Por favor, forneça as informações completas para o registo.
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

      <Form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
        <Input
          label="Nome Completo"
          placeholder="Ex: Vinicius de Oliveira"
          icon={<FaPerson className="text-muted" />}
          error={errors.nome?.message}
          {...register("nome")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="CPF"
            placeholder="Ex: 12345678900"
            icon={<FaFingerprint className="text-muted" />}
            error={errors.cpf?.message}
            {...register("cpf")}
          />

          <Input
            label="Data de Nascimento"
            type="date"
            icon={<FaCalendarDay className="text-muted" />}
            error={errors.dataNascimento?.message}
            {...register("dataNascimento")}
          />
        </div>

        <Select
          label="Identidade de Género"
          icon={<MdWc className="text-muted" />}
          iconExpand={<MdExpandMore className="text-muted" />}
          options={[
            { label: "Masculino", value: "Masculino" },
            { label: "Feminino", value: "Feminino" },
            { label: "Outro", value: "Outro" },
          ]}
          defaultValue="Outro"
          {...register("sexo")}
          error={errors.sexo?.message}
        />

        <div className="pt-6 flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="hover:cursor-pointer"
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar Paciente"}
          </Button>
          <Button
            type="button"
            onClick={() => reset()}
            disabled={isSubmitting}
            variant="secondary"
            className="hover:cursor-pointer"
          >
            Limpar Formulário
          </Button>
        </div>
      </Form>
    </section>
  );
}
