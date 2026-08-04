// portal-os/runtime/services/index.ts

import { SystemState } from "../types";
import { delay, log } from "../utils";

export async function initServices(state: SystemState) {
  log("SERVICES: starting...");
  state.services = "starting";
  try {
    // Simulate starting core services (service registry, health checks)
    await delay(200);
    if (state.runtime !== "running") throw new Error("runtime not running");
    state.services = "running";
    log("SERVICES: running");
  } catch (e) {
    state.services = "failed";
    log("SERVICES: failed to start", e);
    throw e;
  }
}

export async function shutdownServices(state: SystemState) {
  log("SERVICES: shutting down...");
  state.services = state.services === "running" ? "stopping" : state.services;
  await delay(50);
  state.services = "stopped";
  log("SERVICES: stopped");
}
