// portal-os/runtime/bootstrap/index.ts

import { SystemState, ComponentState } from "../types";
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
  log("BOOT: starting Portal-OS core runtime");
  try {
    await initKernel(state);

    // runtime-specific initialization
    log("RUNTIME: initializing...");
    state.runtime = "starting";
    await delay(150);
    if (state.kernel !== "running") throw new Error("kernel not running");
    state.runtime = "running";
    log("RUNTIME: running");

    await initServices(state);

    log("BOOT: core runtime components are up");
    return state;
  } catch (e) {
    log("BOOT: failed to start core runtime", e);
    // Mark any non-running components as failed
    Object.keys(state).forEach((k) => {
      const key = k as keyof SystemState;
      if (state[key] === ("starting" as ComponentState)) state[key] = "failed";
    });
    throw e;
  }
}

export async function shutdown(state: SystemState) {
  log("BOOT: shutdown sequence starting");
  try {
    await shutdownServices(state);
    await shutdownKernel(state);
    state.shell = state.shell === "running" ? "stopped" : state.shell;
    log("BOOT: shutdown complete");
  } catch (e) {
    log("BOOT: shutdown encountered error", e);
    throw e;
  }
}
