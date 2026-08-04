import express from "express";
import { getTeams, getScores } from "../../services/sportsService";

const router = express.Router();

router.get("/teams", async (req, res) => {
  try {
    const teams = await getTeams();
    res.json(teams);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

router.get("/scores", async (req, res) => {
  try {
    const scores = await getScores();
    res.json(scores);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

export default router;
