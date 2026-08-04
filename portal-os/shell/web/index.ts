// portal-os/shell/web/index.ts
// Portal-OS shell web entrypoint — now integrated with runtime/bootstrap.
// Run with: ts-node portal-os/shell/web/index.ts

import * as http from "http";
import { boot, shutdown as runtimeShutdown } from "../../runtime/bootstrap";
import { SystemState } from "../../runtime/types";

let state: SystemState | null = null;
let httpServer: http.Server | null = null;

function startWebShell(port = 3000) {
  console.log(new Date().toISOString(), "|", "SHELL: starting web server on port", port);
  if (!state) state = {
    kernel: "stopped",
    runtime: "stopped",
    services: "stopped",
    shell: "stopped",
  };

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
    if (state) state.shell = "running";
    console.log(new Date().toISOString(), "|", "SHELL: web server listening");
  });

  httpServer.on("error", (err) => {
    if (state) state.shell = "failed";
    console.log(new Date().toISOString(), "|", "SHELL: web server error", err);
  });

  httpServer.listen(port);
}

async function shutdown() {
  console.log(new Date().toISOString(), "|", "SHELL: shutdown requested");
  try {
    if (httpServer) {
      if (state) state.shell = "stopping";
      httpServer.close(() => console.log(new Date().toISOString(), "|", "SHELL: server stopped"));
    }
    if (state) await runtimeShutdown(state);
    console.log(new Date().toISOString(), "|", "SHELL: shutdown complete");
    process.exit(0);
  } catch (e) {
    console.log(new Date().toISOString(), "|", "SHELL: shutdown error", e);
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

(async function main() {
  try {
    state = await boot();
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    startWebShell(port);
    console.log(new Date().toISOString(), "|", "Boot: Portal-OS is up. Visit http://localhost:" + (process.env.PORT || 3000));
  } catch (e) {
    console.log(new Date().toISOString(), "|", "Boot failed:", e);
    process.exit(1);
  }
})();
