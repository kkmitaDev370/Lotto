# lotto

Daily archive of Polish Lotto (6/49) and Lotto Plus draw results.

- `data/lotto.json` – all Lotto draws since 1957
- `data/lotto_plus.json` – all Lotto Plus draws since 2012

Each entry: `{"nr": 7416, "date": "2026-10-10", "numbers": [8, 9, 22, 34, 36, 37]}`.

- `data/predictions.json` – monthly picks, saved on the 1st and played on every draw that month (strategies in `docs/strategies.js`); older entries are per draw

Source: [mbnet.com.pl](http://www.mbnet.com.pl/). A GitHub Actions workflow runs `node scripts/fetch.mjs` on the 1st of every month at 05:00 UTC and commits new draws and the picks for the month.

## Stats page

`docs/` is a static page (GitHub Pages, branch `master`, folder `/docs`) with number frequencies, gaps, pairs, this month's picks, how past picks scored and a backtest of every strategy against random picks. Run locally with `npm run serve` and open http://localhost:5000/docs/.
