import { Input } from "@/src/shared/ui/form/Input";
import { MdSearch } from "react-icons/md";

interface PacienteBarraBuscaProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
}

export function PacienteBarraBusca({
  searchTerm,
  onSearchTermChange,
}: PacienteBarraBuscaProps) {
  return (
    <search
      className="bg-surface rounded-xl shadow-sm border border-border p-4"
      aria-label="Buscar pacientes"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar por Nome ou CPF"
            icon={<MdSearch className="text-muted" aria-hidden="true" />}
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            aria-label="Campo de busca por nome ou CPF"
            className="mb-0"
          />
        </div>
      </div>
    </search>
  );
}
