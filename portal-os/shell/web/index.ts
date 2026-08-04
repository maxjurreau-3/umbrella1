// portal-os/shell/web/index.ts
// Express-based Portal-OS shell entrypoint. Starts the boot sequence and exposes status endpoints.
// Run with: ts-node portal-os/shell/web/index.ts

import express from "express";
import { boot, shutdown as runtimeShutdown } from "../../runtime/bootstrap/boot";
import { SystemState } from "../../runtime/types";
import { listSuites } from "../../runtime/services/registry";

const app = express();
let state: SystemState | null = null;
let server: ReturnType<typeof app.listen> | null = null;

app.get("/status", (req, res) => {
  res.json(state || { error: "not booted" });
});

app.get("/suites", (req, res) => {
  try {
    const suites = listSuites();
    res.json(suites);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.get("/", (req, res) => {
  res.type("html").send(`
    <!doctype html>
    <html>
      <head>
        <meta charset=\"utf-8\">
        <title>Portal-OS Shell (Express)</title>
        <style>body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:20px}</style>
      </head>
      <body>
        <h1>Portal-OS Shell (Express)</h1>
        <p>Visit <a href=\"/status\">/status</a> for system state JSON.</p>
        <p>Visit <a href=\"/suites\">/suites</a> for registered suites.</p>
        <pre>${JSON.stringify(state, null, 2)}</pre>
      </body>
    </html>
  `);
});

async function start() {
  try {
    state = await boot();
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    server = app.listen(port, () => {
      if (state) state.shell = "running";
      console.log(new Date().toISOString(), "|", `SHELL: Express server listening on port ${port}`);
    });
  } catch (e) {
    console.error(new Date().toISOString(), "|", "Boot failed:", e);
    process.exit(1);
  }
}

async function shutdown() {
  console.log(new Date().toISOString(), "|", "SHELL: shutdown requested");
  try {
    if (server) {
      if (state) state.shell = "stopping";
      server.close(() => console.log(new Date().toISOString(), "|", "SHELL: server stopped"));
    }
    if (state) await runtimeShutdown(state);
    console.log(new Date().toISOString(), "|", "SHELL: shutdown complete");
    process.exit(0);
  } catch (e) {
    console.error(new Date().toISOString(), "|", "SHELL: shutdown error", e);
    process.exit(1);
  }
}

process.on("SIGINT", () => {
  console.log(new Date().toISOString(), "|", "SIGINT received");
  shutdown();
});
process.on("SIGTERM", () => {
  console.log(new Date().toISOString(), "|", "SIGTERM received");
  shutdown();
});

start();
