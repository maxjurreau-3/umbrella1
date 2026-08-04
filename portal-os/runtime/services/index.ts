// portal-os/runtime/services/index.ts

import { SystemState } from "../types";
import { delay, log } from "../utils";
import { registerSuite } from "./registry";

export async function initServices(state: SystemState) {
  log("SERVICES: starting...");
  state.services = "starting";
  try {
    // Simulate starting core services (service registry, health checks)
    await delay(200);
    if (state.runtime !== "running") throw new Error("runtime not running");

    // Attempt to dynamically load known suites and initialize them
    try {
      const identityModule = await import("../../portal-os/suites/identity/api/index");
      if (identityModule && typeof identityModule.initIdentity === "function") {
        const info = await identityModule.initIdentity(state);
        registerSuite("identity", info);
      }
    } catch (e) {
      // If the suite isn't present or fails, log and continue — services can still run
      log("SERVICES: warning — identity suite not initialized or failed", e?.message || e);
    }

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
  // Optionally, call suite shutdown hooks if available
  state.services = "stopped";
  log("SERVICES: stopped");
}
