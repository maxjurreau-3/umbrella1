// portal-os/suites/identity/api/index.ts

import { SystemState } from "../../../runtime/types";
import { delay, log } from "../../../runtime/utils";

export async function initIdentity(state: SystemState) {
  log("IDENTITY: initializing suite...");
  // Simulate loading identity graph, auth providers, DB connections
  await delay(120);
  if (state.runtime !== "running") {
    throw new Error("runtime not running — cannot start identity suite");
  }

  // Suite metadata to register with the service registry
  const info = {
    name: "identity",
    version: "0.1.0",
    endpoints: ["/api/identity/login", "/api/identity/profile"],
  };

  log("IDENTITY: ready", info);
  return info;
}
