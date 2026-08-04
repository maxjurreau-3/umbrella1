// portal-os/suites/sports/services/sportsService.ts
// Minimal in-memory sports service for Portal-OS Sports Suite.
// Replace with real data source or runtime IPC as the suite evolves.

export type Team = { id: string; name: string };
export type Score = { id: string; homeTeamId: string; awayTeamId: string; homeScore: number; awayScore: number; date: string };

// Example static data to get the suite working quickly:
const TEAMS: Team[] = [
  { id: "t1", name: "Portal City Hawks" },
  { id: "t2", name: "Riverside Raptors" },
  { id: "t3", name: "Mountain Lions" },
];

const SCORES: Score[] = [
  { id: "s1", homeTeamId: "t1", awayTeamId: "t2", homeScore: 78, awayScore: 65, date: "2026-08-01" },
  { id: "s2", homeTeamId: "t3", awayTeamId: "t1", homeScore: 54, awayScore: 60, date: "2026-08-02" },
];

export async function getTeams(): Promise<Team[]> {
  // Simulate async I/O; switch to DB or runtime IPC later.
  return Promise.resolve(TEAMS);
}

export async function getScores(): Promise<Score[]> {
  // Simulate async I/O; switch to DB or runtime IPC later.
  return Promise.resolve(SCORES);
}
