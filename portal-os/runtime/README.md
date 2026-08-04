# RUNTIME - OS Services & Routing

RUNTIME provides the services that Portal-OS needs to function:

- **bootstrap/**: Initialization sequence, config loading, service startup
- **routing/**: Request routing, service discovery, load balancing
- **services/**: Service registry, lifecycle management, health checks

## Responsibilities

RUNTIME depends on KERNEL and coordinates all Portal-OS services. It implements the bootstrap sequence, routes incoming requests to appropriate services, and manages service lifecycles.
