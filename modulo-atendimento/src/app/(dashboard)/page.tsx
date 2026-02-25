import Indicadores from "@/src/features/dashboard/components/Indicadores";
import { AtendimentosList } from "../../features/dashboard/components/AtendimentoList";

function DashboardPage() {
  return (
    <>
      <header className="mb-6" aria-label="Inicio da página">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted mt-1">
          Visão geral do fluxo de atendimento hospitalar.
        </p>
      </header>

      <Indicadores />

      <AtendimentosList />
    </>
  );
}

export default DashboardPage;
