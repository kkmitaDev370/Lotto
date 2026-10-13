// Zapisuje własny typ na następne losowanie: node scripts/pick.mjs 7,14,23,31,38,44 "krótkie uzasadnienie"
import { readFile, writeFile } from 'node:fs/promises';
import { nextDrawDate } from '../docs/strategies.js';

const PREDICTIONS = 'data/predictions.json';
const [nums, note] = process.argv.slice(2);

const picks = (nums ?? '').split(',').map(Number).sort((a, b) => a - b);
if (picks.length !== 6 || new Set(picks).size !== 6 || !picks.every((n) => Number.isInteger(n) && n >= 1 && n <= 49)) {
  console.error('Podaj 6 różnych liczb 1-49 po przecinku, np. 7,14,23,31,38,44');
  process.exit(1);
}

const lotto = JSON.parse(await readFile('data/lotto.json', 'utf8'));
const last = lotto.at(-1);
const next = { nr: last.nr + 1, date: nextDrawDate(last.date) };

// Typ po 21:30 w dniu losowania (lub później) byłby nieuczciwy – losowanie jest o 22:00.
const now = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Warsaw' }).slice(0, 16);
if (now >= `${next.date} 21:30`) {
  console.error(`Za późno na typ na losowanie ${next.nr} (${next.date}, 22:00).`);
  process.exit(1);
}

const predictions = JSON.parse(await readFile(PREDICTIONS, 'utf8'));
let entry = predictions.find((p) => p.nr === next.nr);
if (entry?.picks.own) {
  console.error(`Własny typ na losowanie ${next.nr} już jest: ${entry.picks.own.join(',')}`);
  process.exit(1);
}
if (!entry) {
  entry = { ...next, createdAt: new Date().toISOString(), picks: {} };
  predictions.push(entry);
  predictions.sort((a, b) => a.nr - b.nr);
}
entry.picks.own = picks;
if (note) entry.notes = { ...entry.notes, own: note };

await writeFile(PREDICTIONS, `[\n${predictions.map((p) => '  ' + JSON.stringify(p)).join(',\n')}\n]\n`);
console.log(`Własny typ na losowanie ${next.nr} (${next.date}): ${picks.join(',')}`);
