import express from "express";
import path from "path";

// OS Routing
import osRouter from "../../runtime/routing/router";

// Identity Suite
import identityRoutes from "../../suites/identity/api/routes";

// Sports Suite
import sportsRoutes from "../../suites/sports/api/routes";

const app = express();
const PORT = process.env.PORT || 8787;

// -----------------------------
// STATIC FILES (for Cloudflare)
// -----------------------------
app.use(express.static(path.join(__dirname, "public")));

// -----------------------------
// OS ROUTING
// -----------------------------
app.use("/os", osRouter);

// -----------------------------
// SUITE ROUTING
// -----------------------------
app.use("/api/identity", identityRoutes);
app.use("/api/sports", sportsRoutes);

// -----------------------------
// SUITE UI PAGES
// -----------------------------
app.get("/identity", (_req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Identity Suite</h1>
        <p>API: /api/identity/me</p>
      </body>
    </html>
  `);
});

app.get("/sports", (_req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Sports Suite</h1>
        <p>API: /api/sports/teams</p>
        <p>API: /api/sports/scores</p>
      </body>
    </html>
  `);
});

// -----------------------------
// ROOT
// -----------------------------
app.get("/", (_req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Portal‑OS</h1>
        <ul>
          <li><a href="/identity">Identity Suite</a></li>
          <li><a href="/sports">Sports Suite</a></li>
          <li><a href="/os/kernel/status">Kernel Status</a></li>
          <li><a href="/os/runtime/info">Runtime Info</a></li>
          <li><a href="/os/services">Services</a></li>
          <li><a href="/os/suites">Suites</a></li>
          <li><a href="/os/settings">Settings</a></li>
        </ul>
      </body>
    </html>
  `);
});

// -----------------------------
// START SERVER
// -----------------------------
app.listen(PORT, () => {
  console.log(`Portal‑OS running on port ${PORT}`);
});
