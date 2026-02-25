# Sistema de Gestao Hospitalar - Modulo de Atendimento

!!! O projeto usa o node ^20

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Zustand (Segura os dados na memoria)
- React Hook Form + Zod

## Como executar

1. Entre na pasta do app:

```bash
cd modulo-atendimento
```

2. Instale dependencias:

```bash
npm install
```

3. Rode em desenvolvimento:

```bash
npm run dev
```

4. Acesse:

`http://localhost:3000`

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Escopo entregue

- Dashboard de atendimentos com:
  - Total de atendimentos hoje
  - Pacientes em espera
  - Internacoes ativas
  - Tabela paginada de atendimentos (paciente, cpf, tipo, data/hora, status)
- Gestao de pacientes com:
  - Busca por nome ou CPF
  - Cadastro de paciente
- Registro de atendimento com:
  - Vinculo obrigatorio a paciente
  - Tipos: Ambulatorial, Internacao, Pronto Socorro
  - Regras condicionais:
    - Pronto Socorro exige nivel de urgencia e queixa principal
    - Internacao exige leito e setor de internacao

## Arquitetura

- `features/*/domain`: schemas Zod e tipos de dominio
- `features/*/data`: store Zustand e estado da feature
- `features/*/services`: camada de servico com providers
- `shared/ui`: componentes reutilizaveis (form, tabela, cards, buttons)
- `app/*`: composicao das paginas

## Persistencia (provider)

O projeto suporta dois providers para os dados mockados:

- `memory` (padrao)
- `localstorage`

Disponibilizei o .env.local removendo do gitignore para facilitar a configuração. Está usando localstorage atualmente

Defina no `.env.local`:

```env
NEXT_PUBLIC_DATA_PROVIDER=memory
```

ou

```env
NEXT_PUBLIC_DATA_PROVIDER=localstorage
```

## Observacoes

- Desenvolvi um preparado para evoluir de mock para API real sem quebrar as telas, mantendo a interface dos services.
- Formularios usam validacao de schema com regras condicionais via Zod.
