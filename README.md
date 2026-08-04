# Umbrella Ecosystem

A multi-layer operating system combining:
- **SIM**: Cognitive builder engine
- **Portal-OS**: Runtime kernel and shell
- **Substrate**: Planetary-scale compute layer
- **Governance**: Identity, policy, economics, compliance
- **Infra**: Deployment and monitoring

## Getting Started

See `.copilot/intents.md` and `.copilot/architecture_map.md` for the full system design.

## Structure

```
umbrella/
├── sim/              # Builder engine (MODE, CODE, PIPELINE, CONFIG)
├── portal-os/        # Runtime OS (KERNEL, RUNTIME, SHELL, API, SUITES)
├── substrate/        # Planetary compute layer
├── governance/       # Identity, policy, economics, compliance
└── infra/            # Dev server, deployment, CI/CD, monitoring
```

## Copilot Integration

This repository is designed to be understood and extended by Copilot. All architectural decisions and module responsibilities are documented in `.copilot/` for consistent code generation.
