// portal-os/runtime/bootstrap/boot.ts
// Portal-OS boot sequence implementation. Orchestrates kernel -> runtime -> services startup and shutdown.

import { SystemState } from "../types";
import { initKernel, shutdownKernel } from "../../kernel";
import { initServices, shutdownServices } from "../services";
import { delay, log } from "../utils";

function initialState(): SystemState {
  return {
    kernel: "stopped",
    runtime: "stopped",
    services: "stopped",
    shell: "stopped",
  };
}

export async function boot(): Promise<SystemState> {
  const state = initialState();
  log("BOOT: starting Portal-OS core runtime (boot.ts)");

  try {
    // Kernel
    await initKernel(state);

    // Runtime initialization (bootstrap config, routing)
    log("RUNTIME: initializing (bootstrap)");
    state.runtime = "starting";
    await delay(150);
    if (state.kernel !== "running") throw new Error("kernel not running");
    state.runtime = "running";
    log("RUNTIME: running");

    // Services (service registry, health checks, suites)
    await initServices(state);

    log("BOOT: core runtime components are up (boot.ts)");
    return state;
  } catch (e) {
    log("BOOT: failed to start core runtime", e);
    // mark starting components as failed
    (Object.keys(state) as Array<keyof SystemState>).forEach((k) => {
      if (state[k] === "starting") state[k] = "failed";
    });
    throw e;
  }
}

export async function shutdown(state: SystemState) {
  log("BOOT: shutdown sequence starting (boot.ts)");
  try {
    await shutdownServices(state);
    await shutdownKernel(state);
    state.shell = state.shell === "running" ? "stopped" : state.shell;
    log("BOOT: shutdown complete (boot.ts)");
  } catch (e) {
    log("BOOT: shutdown encountered error", e);
    throw e;
  }
}
