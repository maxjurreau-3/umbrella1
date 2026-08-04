// portal-os/runtime/types.ts

export type ComponentState = "stopped" | "starting" | "running" | "failed" | "stopping";

export interface SystemState {
  kernel: ComponentState;
  runtime: ComponentState;
  services: ComponentState;
  shell: ComponentState;
}
