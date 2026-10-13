# lotto

Daily archive of Polish Lotto (6/49) and Lotto Plus draw results.

- `data/lotto.json` – all Lotto draws since 1957
- `data/lotto_plus.json` – all Lotto Plus draws since 2012

Each entry: `{"nr": 7416, "date": "2026-10-10", "numbers": [8, 9, 22, 34, 36, 37]}`.

- `data/predictions.json` – picks for the next draw, saved before it happens (strategies in `docs/strategies.js`)

Source: [mbnet.com.pl](http://www.mbnet.com.pl/). A GitHub Actions workflow runs `node scripts/fetch.mjs` every day at 05:00 UTC and commits new draws and the next picks.

## Stats page

`docs/` is a static page (GitHub Pages, branch `master`, folder `/docs`) with number frequencies, gaps, pairs, the next picks, how past picks scored and a backtest of every strategy against random picks. Run locally with `npm run serve` and open http://localhost:5000/docs/.
