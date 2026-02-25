import PacienteList from "../../features/pacientes/components/PacienteList";
import Link from "next/link";

function PacientesPage() {
  return (
    <>
      <header className="mb-6 justify-between items-end flex">
        <article>
          <h1 className="text-2xl font-bold mb-4">Pacientes</h1>
          <p>
            Esta é a página de pacientes. Aqui você pode gerenciar os pacientes
            do hospital.
          </p>
        </article>
        <Link
          href="/pacientes/registrar"
          className="inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-hover"
        >
          Registrar Paciente
        </Link>
      </header>

      <PacienteList />
    </>
  );
}

export default PacientesPage;
