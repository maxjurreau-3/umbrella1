# Copilot Architecture Map — Umbrella Ecosystem

This file describes how all subsystems connect so Copilot can generate consistent code across the entire repo.

---

## High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Umbrella Ecosystem                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  SIM (Builder Engine)                               │   │
│  │  ├── MODE: primitives, operators, cognitive graphs  │   │
│  │  ├── CODE: compiler, schedulers, IO                 │   │
│  │  ├── PIPELINE: multi-stage workflows                │   │
│  │  └── CONFIG: profiles, environments                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                      ↓ generates ↓                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Portal-OS (Runtime Engine)                         │   │
│  │  ├── KERNEL: scheduler, memory, IPC, drivers        │   │
│  │  ├── RUNTIME: bootstrap, routing, services          │   │
│  │  ├── SHELL: web UI, components, assets              │   │
│  │  ├── API: public and internal endpoints             │   │
│  │  └── SUITES: identity, sports, creator, finance     │   │
│  └─────────────────────────────────────────────────────┘   │
│           ↓ runs on ↓              ↓ uses ↓                │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │  Substrate Layer     │  │  Governance Layer    │        │
│  │  (planetary compute) │  │  (identity, policy,  │        │
│  │                      │  │   economics,         │        │
│  │  CLASS-B: regional   │  │   compliance)        │        │
│  │  CLASS-C: planetary  │  │                      │        │
│  │  TOOLS: analysis     │  │  identity graph      │        │
│  └──────────────────────┘  │  policy compiler     │        │
│                            │  pricing engines     │        │
│                            │  audit logging       │        │
│                            └──────────────────────┘        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Infra Layer                                        │   │
│  │  ├── dev_server: local development                  │   │
│  │  ├── deployment: production release                 │   │
│  │  ├── ci_cd: automation and testing                  │   │
│  │  └── monitoring: observability                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### SIM → Portal-OS → User

```
SIM.MODE (primitives)
    ↓
SIM.CODE (compile)
    ↓
SIM.PIPELINE (orchestrate)
    ↓
Portal-OS.KERNEL (schedule/execute)
    ↓
Portal-OS.RUNTIME (bootstrap/route)
    ↓
Portal-OS.SHELL (render UI)
    ↓
Portal-OS.SUITES (app logic)
    ↓
User Interface / API Response
```

---

## Module Responsibilities

### SIM (Builder)

**Purpose**: Generate runtime configurations and Portal-OS deployments.

- **MODE/primitives**: Defines data types, state representations, vectors
- **MODE/operators**: Implements transformations, computations, logic operations
- **CODE/compiler**: Transforms MODE definitions into executable code
- **CODE/schedulers**: Plans execution order and resource allocation
- **PIPELINE/graphs**: Defines workflow DAGs
- **PIPELINE/orchestrator**: Executes workflows deterministically
- **CONFIG/profiles**: Environment-specific settings (dev, prod, test)

**Dependencies**: None (foundation layer)

---

### Portal-OS (Runtime)

**Purpose**: Provide a complete OS for services, applications, and user interaction.

#### KERNEL
- **scheduler**: Task scheduling, priority queues, load balancing
- **memory**: Allocation, garbage collection, pooling
- **ipc**: Message passing, event distribution, RPC
- **drivers**: Hardware abstraction, device management

**Dependencies**: SIM.PIPELINE (workflow execution)

#### RUNTIME
- **bootstrap**: Initialization sequence, service startup, config loading
- **routing**: Request routing, service discovery, load balancing
- **services**: Service registry, lifecycle management, health checks

**Dependencies**: KERNEL (scheduling, IPC)

#### SHELL
- **web**: HTTP server, middleware, request handling
- **components**: React/Vue components, UI primitives
- **assets**: Static files, stylesheets, images

**Dependencies**: RUNTIME (routing, services)

#### API
- **public**: User-facing endpoints (authentication, REST/GraphQL)
- **internal**: Inter-service communication, admin endpoints

**Dependencies**: RUNTIME (routing), SHELL (web server)

#### SUITES
Each suite implements an independent application:

**Identity Suite**
- `api/`: Authentication, user profiles, credential management
- `ui/`: Login forms, account settings, credential UI
- **Dependencies**: Governance.IDENTITY (identity graph), KERNEL (IPC)

**Sports Suite**
- `api/`: Leagues, teams, events, statistics
- `ui/`: League standings, team rosters, event schedules
- **Dependencies**: RUNTIME (routing), SHELL (UI)

**Creator Suite**
- `api/`: Content creation, publishing, distribution
- `ui/`: Editor, dashboard, publish workflows
- **Dependencies**: Governance.POLICY (content policies), SHELL (UI)

**Finance Suite**
- `api/`: Transactions, pricing, payments
- `ui/`: Wallet, transaction history, pricing display
- **Dependencies**: Governance.ECONOMICS (pricing), KERNEL (IPC)

**Quantum Suite**
- `api/`: Quantum simulation, algorithm execution
- `ui/`: Circuit builder, results visualization
- **Dependencies**: Substrate.CLASS_C (field equations)

---

### Substrate (Planetary Compute)

**Purpose**: Model physics, fields, flows, and simulations at planetary scale.

- **CLASS_B/geometry**: Regional coordinate systems, topology
- **CLASS_B/dynamics**: Movement, forces, interactions
- **CLASS_C/fields**: Field equations (gravity, EM, etc.)
- **CLASS_C/flows**: Fluid dynamics, particle flows
- **CLASS_C/constraints**: Boundary conditions, conservation laws
- **TOOLS/analyzers**: Statistical analysis, simulations
- **TOOLS/visualizers**: 3D rendering, flow visualization

**Dependencies**: SIM.MODE (primitives for field representation)

---

### Governance (Rules & Economics)

**Purpose**: Define identity, policy, economics, and compliance.

#### IDENTITY
- **graph**: User identity graph, relationships, trust
- **credentials**: Verification, issuance, revocation

#### POLICY
- **language**: DSL for policy rules
- **compilers**: Compile policies into enforceable code

#### ECONOMICS
- **pricing_engines**: Compute prices dynamically
- **token_models**: Token distribution, supply, staking

#### COMPLIANCE
- **logging**: Audit trails, event logging
- **reporting**: Compliance reports, dashboards

**Dependencies**: None (policy layer)

---

### Infra (Deployment & Operations)

**Purpose**: Support development, deployment, testing, and monitoring.

- **dev_server**: Local dev environment with hot reload
- **deployment**: Production rollout scripts, K8s configs
- **ci_cd**: GitHub Actions, testing, builds
- **monitoring**: Prometheus metrics, logging, alerts

**Dependencies**: All other modules (orchestrates deployment)

---

## Request Flow Example

### User creates a finance transaction:

1. **User** → Portal-OS.SHELL.web (HTTP POST /finance/transaction)
2. **SHELL** → Portal-OS.RUNTIME.routing (route to Finance suite)
3. **RUNTIME** → Portal-OS.API.public (finance endpoint)
4. **API** → Portal-OS.SUITES.finance.api (process transaction)
5. **Finance.api** → Governance.ECONOMICS (get pricing)
6. **Finance.api** → Governance.IDENTITY (verify user)
7. **Finance.api** → Portal-OS.KERNEL.ipc (log event)
8. **KERNEL** → Portal-OS.KERNEL.memory (store transaction)
9. **KERNEL** → Portal-OS.RUNTIME.services (update service state)
10. **Response** → SHELL → User

---

## Initialization Sequence

1. **Infra.dev_server** starts Portal-OS
2. **Portal-OS.KERNEL.scheduler** initializes
3. **Portal-OS.RUNTIME.bootstrap** runs startup sequence
4. **Portal-OS.RUNTIME.services** starts service registry
5. **Portal-OS.SUITES** load and register
6. **SIM.PIPELINE.orchestrator** begins workflow execution
7. **Portal-OS.SHELL.web** starts accepting connections
8. System ready

---

## Naming Conventions

- **Modules**: lowercase_with_underscores (e.g., `pricing_engines`)
- **Types**: PascalCase (e.g., `FinanceTransaction`)
- **Functions**: camelCase (e.g., `computePrice`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_QUEUE_SIZE`)
- **Files**: lowercase-with-hyphens.ts/.js for code, lowercase_with_underscores.md for docs
- **Exports**: Named exports organized by responsibility

---

## Copilot Behavior

Copilot should:

1. **Understand architecture**: Respect module boundaries and dependencies
2. **Generate consistently**: Follow naming conventions and folder structure
3. **Maintain coupling rules**: Keep imports organized, avoid circular dependencies
4. **Expand systematically**: Add suites, drivers, and services following patterns
5. **Document thoroughly**: Include TSDoc, README, and type definitions
6. **Test comprehensively**: Include unit and integration tests
7. **Consider performance**: Optimize critical paths (kernel, routing, scheduling)
8. **Ensure type safety**: Use TypeScript strict mode, avoid `any`

---

## Key Design Principles

1. **Layered Architecture**: Clear separation between SIM, Portal-OS, Substrate, Governance, Infra
2. **Modular Suites**: Apps are independent, communicate through well-defined APIs
3. **Async-First**: All I/O is asynchronous, use queues and event systems
4. **Deterministic**: SIM.PIPELINE ensures reproducible execution
5. **Observable**: Governance.COMPLIANCE logs all significant events
6. **Scalable**: Substrate supports planetary-scale computation
7. **Extensible**: New suites, drivers, and services can be added without modifying core
