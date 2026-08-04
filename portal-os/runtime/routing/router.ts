import express from "express";
import { serviceRegistry } from "../services/registry";
import suiteRegistry from "../services/suiteRegistry";

const router = express.Router();

// Kernel status (placeholder)
router.get("/kernel/status", (req, res) => {
  res.json({ kernel: "ok", timestamp: new Date().toISOString() });
});

// Runtime info (placeholder)
router.get("/runtime/info", (req, res) => {
  res.json({ runtime: "Portal-OS Runtime", version: "0.1.0", timestamp: new Date().toISOString() });
});

// List registered services
router.get("/services", (req, res) => {
  try {
    res.json(serviceRegistry.listServices());
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

// List registered suites
router.get("/suites", (req, res) => {
  try {
    res.json(suiteRegistry.listSuites());
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

export default router;
