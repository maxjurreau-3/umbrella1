# KERNEL - Core OS Services

The KERNEL provides the fundamental services that Portal-OS depends on:

- **scheduler/**: Task scheduling, priority queues, load balancing
- **memory/**: Memory allocation, garbage collection, pooling
- **ipc/**: Inter-process communication, message passing
- **drivers/**: Device drivers, hardware abstraction

## Responsibilities

The KERNEL is the lowest level of Portal-OS. All other modules depend on KERNEL services. It ensures deterministic execution, efficient resource utilization, and reliable inter-process communication.
