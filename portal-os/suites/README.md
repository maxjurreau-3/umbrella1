# SUITES - Modular Applications

Suites are independent applications that run on Portal-OS. Each suite provides backend API and frontend UI:

- **identity/**: Authentication, user profiles, credentials
- **sports/**: Leagues, teams, events, statistics
- **creator/**: Content creation and publishing
- **finance/**: Transactions, pricing, payments
- **quantum/**: Quantum simulation and computing

Each suite has:
- `api/`: Backend endpoints
- `ui/`: Frontend components

## Adding a New Suite

1. Create `suites/{suite_name}/` directory
2. Create `{suite_name}/api/` subdirectory for backend
3. Create `{suite_name}/ui/` subdirectory for frontend
4. Implement API endpoints in the suite's `api/` directory
5. Implement UI components in the suite's `ui/` directory
6. Register suite in Portal-OS RUNTIME service registry
