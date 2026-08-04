finally(() => setLoading(false));
      }, []);

      if (loading) {
        return React.createElement(
          'div',
          null,
          'Loading Sports Suite...'
        );
      }

      return React.createElement(
        'div',
        null,
        React.createElement('h1', null, 'Sports Suite'),
        React.createElement('h2', null, 'Teams'),
        React.createElement(
          'ul',
          null,
          teams.map(t =>
            React.createElement('li', { key: t.id }, t.name)
          )
        ),
        React.createElement('h2', null, 'Scores'),
        React.createElement(
          'ul',
          null,
          scores.map(s =>
            React.createElement(
              'li',
              { key: s.id },
              `${s.homeScore}-${s.awayScore} (${s.date})`
            )
          )
        )
      );
    }

    ReactDOM.createRoot(
      document.getElementById('root')!
    ).render(React.createElement(App));
  </script>
</body>
</html>`);
