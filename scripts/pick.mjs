// Zapisuje własny typ na bieżący miesiąc: node scripts/pick.mjs 7,14,23,31,38,44 "krótkie uzasadnienie"
// Typ gra na każde losowanie w miesiącu, od pierwszego, na które da się jeszcze uczciwie typować.
import { readFile, writeFile } from 'node:fs/promises';
import { firstDrawFrom, warsawNow } from '../docs/strategies.js';

const PREDICTIONS = 'data/predictions.json';
const [nums, note] = process.argv.slice(2);

const picks = (nums ?? '').split(',').map(Number).sort((a, b) => a - b);
if (picks.length !== 6 || new Set(picks).size !== 6 || !picks.every((n) => Number.isInteger(n) && n >= 1 && n <= 49)) {
  console.error('Podaj 6 różnych liczb 1-49 po przecinku, np. 7,14,23,31,38,44');
  process.exit(1);
}

const from = firstDrawFrom(warsawNow());
const month = from.slice(0, 7);

const predictions = JSON.parse(await readFile(PREDICTIONS, 'utf8'));
let entry = predictions.find((p) => p.month === month);
if (entry?.picks.own) {
  console.error(`Własny typ na ${month} już jest: ${entry.picks.own.join(',')}`);
  process.exit(1);
}
// Wpis gra od entry.from – jeśli to losowanie już minęło, typ byłby po fakcie.
if (entry && entry.from < from) {
  console.error(`Za późno na typ na ${month}: wpis gra od ${entry.from}.`);
  process.exit(1);
}
if (!entry) {
  entry = { month, from, createdAt: new Date().toISOString(), picks: {} };
  predictions.push(entry);
}
entry.picks.own = picks;
if (note) entry.notes = { ...entry.notes, own: note };

await writeFile(PREDICTIONS, `[\n${predictions.map((p) => '  ' + JSON.stringify(p)).join(',\n')}\n]\n`);
console.log(`Własny typ na ${month} (od ${entry.from}): ${picks.join(',')}`);
