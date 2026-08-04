// portal-os/runtime/services/registry.ts

import { log } from "../utils";

const registry = new Map<string, any>();

export function registerSuite(name: string, info: any) {
  registry.set(name, info);
  log("REGISTRY: suite registered", name, info);
}

export function getSuite(name: string) {
  return registry.get(name);
}

export function listSuites() {
  return Array.from(registry.entries()).map(([name, info]) => ({ name, info }));
}
