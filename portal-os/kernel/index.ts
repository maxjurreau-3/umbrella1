// portal-os/kernel/index.ts

import { SystemState } from "../runtime/types";
import { delay, log } from "../runtime/utils";

export async function initKernel(state: SystemState) {
  log("KERNEL: initializing...");
  state.kernel = "starting";
  try {
    // Simulated kernel initialization (drivers, memory, scheduler)
    await delay(250);
    // place for real kernel init hooks
    state.kernel = "running";
    log("KERNEL: running");
  } catch (e) {
    state.kernel = "failed";
    log("KERNEL: failed to start", e);
    throw e;
  }
}

export async function shutdownKernel(state: SystemState) {
  log("KERNEL: shutting down...");
  state.kernel = state.kernel === "running" ? "stopping" : state.kernel;
  await delay(50);
  state.kernel = "stopped";
  log("KERNEL: stopped");
}
