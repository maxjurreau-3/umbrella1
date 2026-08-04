# PIPELINE - Workflow Orchestration

PIPELINE orchestrates deterministic multi-stage workflows, scheduling stages and managing their execution.

## Subdirectories

- **graphs/**: Workflow DAG definitions
- **stages/**: Stage implementations
- **orchestrator/**: Workflow execution engine

## Role in SIM

PIPELINE takes compiled code from CODE and organizes it into workflows. The orchestrator deterministically executes these workflows, managing dependencies and resource allocation.
