// portal-os/shell/web/index.ts
// Minimal Portal-OS shell web entrypoint and boot sequence simulator.
// Run with: ts-node portal-os/shell/web/index.ts

import * as http from "http";

type ComponentState = "stopped" | "starting" | "running" | "failed" | "stopping";

const state = {
  kernel: "stopped" as ComponentState,
  runtime: "stopped" as ComponentState,
  services: "stopped" as ComponentState,
  shell: "stopped" as ComponentState,
};

function log(...args: any[]) {
  console.log(new Date().toISOString(), "|", ...args);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function initKernel() {
  log("KERNEL: initializing...");
  state.kernel = "starting";
  try {
    // Simulate kernel init tasks (drivers, memory, scheduler)
    await delay(300);
    // If needed, load config or check environment here
    state.kernel = "running";
    log("KERNEL: running");
  } catch (e) {
    state.kernel = "failed";
    log("KERNEL: failed to start", e);
    throw e;
  }
}

async function initRuntime() {
  log("RUNTIME: initializing...");
  state.runtime = "starting";
  try {
    // Simulate bootstrap, service registry, routing
    await delay(300);
    if (state.kernel !== "running") throw new Error("kernel not running");
    state.runtime = "running";
    log("RUNTIME: running");
  } catch (e) {
    state.runtime = "failed";
    log("RUNTIME: failed to start", e);
    throw e;
  }
}

async function initServices() {
  log("SERVICES: starting...");
  state.services = "starting";
  try {
    // Simulate starting core services
    await delay(300);
    if (state.runtime !== "running") throw new Error("runtime not running");
    state.services = "running";
    log("SERVICES: running");
  } catch (e) {
    state.services = "failed";
    log("SERVICES: failed to start", e);
    throw e;
  }
}

let httpServer: http.Server | null = null;

function startWebShell(port = 3000) {
  log("SHELL: starting web server on port", port);
  state.shell = "starting";

  httpServer = http.createServer((req, res) => {
    if (req.url === "/status") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(state, null, 2));
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <!doctype html>
      <html>
      <head>
        <meta charset=\"utf-8\">
        <title>Portal-OS Shell</title>
        <style>body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:20px}</style>
      </head>
      <body>
        <h1>Portal-OS Shell</h1>
        <p>Boot sequence status:</p>
        <pre>${JSON.stringify(state, null, 2)}</pre>
        <p>Endpoint: <a href=\"/status\">/status</a></p>
      </body>
      </html>
    `);
  });

  httpServer.on("listening", () => {
    state.shell = "running";
    log("SHELL: web server listening");
  });

  httpServer.on("error", (err) => {
    state.shell = "failed";
    log("SHELL: web server error", err);
  });

  httpServer.listen(port);
}

async function shutdown() {
  log("Shutdown: beginning...");
  try {
    if (httpServer) {
      state.shell = "stopping";
      httpServer.close(() => log("SHELL: server stopped"));
    }
    state.services = state.services === "running" ? "stopping" : state.services;
    await delay(100);
    state.services = "stopped";
    state.runtime = state.runtime === "running" ? "stopped" : state.runtime;
    state.kernel = state.kernel === "running" ? "stopped" : state.kernel;
    log("Shutdown: complete");
    process.exit(0);
  } catch (e) {
    log("Shutdown: encountered error", e);
    process.exit(1);
  }
}

process.on("SIGINT", () => {
  log("SIGINT received");
  shutdown();
});
process.on("SIGTERM", () => {
  log("SIGTERM received");
  shutdown();
});

async function bootSequence() {
  log("Boot: starting Portal-OS core runtime");
  try {
    await initKernel();
    await initRuntime();
    await initServices();

    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    startWebShell(port);

    log("Boot: Portal-OS is up. Visit http://localhost:" + (process.env.PORT || 3000));
  } catch (e) {
    log("Boot failed:", e);
    // keep process alive for inspection, or exit non-zero
    process.exit(1);
  }
}

// Start
bootSequence();
