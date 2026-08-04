import sportsRoutes from "../../suites/sports/api/routes";

// mount Sports Suite API
app.use("/api/sports", sportsRoutes);

// Sports Suite UI entrypoint (dev HTML: CDN React + Babel for quick dev, no build required)
app.get("/sports", (req, res) => {
  res.type("html").send(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Portal-OS — Sports Suite</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:20px}</style>
  </head>
  <body>
    <div id="root"></div>

    <!-- React + ReactDOM via CDN (dev) and Babel for inline JSX (dev only) -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <!-- Minimal inline React app that fetches the Sports Suite API -->
    <script type="text/babel">
      const { useState, useEffect } = React;
      function App() {
        const [teams, setTeams] = useState([]);
        const [scores, setScores] = useState([]);
        const [loading, setLoading] = useState(true);
        useEffect(() => {
          Promise.all([fetch('/api/sports/teams'), fetch('/api/sports/scores')])
            .then(async ([tRes, sRes]) => {
              const t = await tRes.json();
              const s = await sRes.json();
              setTeams(t);
              setScores(s);
            })
            .catch((e) => console.error(e))
            .finally(() => setLoading(false));
        }, []);
        if (loading) return React.createElement('div', null, 'Loading Sports Suite...');
        return React.createElement('div', null,
          React.createElement('h1', null, 'Sports Suite'),
          React.createElement('h2', null, 'Teams'),
          React.createElement('ul', null, teams.map(t => React.createElement('li', { key: t.id }, t.name))),
          React.createElement('h2', null, 'Scores'),
          React.createElement('ul', null, scores.map(s => React.createElement('li', { key: s.id }, `${s.homeScore}–${s.awayScore} (${s.date})`)))
        );
      }
      ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
    </script>
  </body>
</html>`);
});
