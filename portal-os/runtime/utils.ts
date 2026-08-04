// portal-os/runtime/utils.ts

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function log(...args: any[]) {
  console.log(new Date().toISOString(), "|", ...args);
}
