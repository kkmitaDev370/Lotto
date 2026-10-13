// Pobiera wyniki Lotto i Lotto Plus z mbnet.com.pl i dopisuje brakujące losowania do data/*.json.
// Idempotentne: losowania są kluczowane numerem, istniejące rekordy nie są nadpisywane.
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const SOURCES = [
  { name: 'lotto', url: 'http://www.mbnet.com.pl/dl.txt', file: 'data/lotto.json' },
  { name: 'lotto_plus', url: 'http://www.mbnet.com.pl/dl_plus.txt', file: 'data/lotto_plus.json' },
];

const LINE = /^(\d+)\.\s+(\d{2})\.(\d{2})\.(\d{4})\s+([\d,]+)$/;

function parse(text, name) {
  const draws = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const m = LINE.exec(line);
    if (!m) throw new Error(`${name}: niepoprawna linia "${line}"`);
    const [, nr, dd, mm, yyyy, nums] = m;
    const numbers = nums.split(',').map(Number);
    const valid =
      numbers.length === 6 &&
      new Set(numbers).size === 6 &&
      numbers.every((n) => Number.isInteger(n) && n >= 1 && n <= 49);
    if (!valid) throw new Error(`${name}: niepoprawne liczby w "${line}"`);
    draws.push({ nr: Number(nr), date: `${yyyy}-${mm}-${dd}`, numbers });
  }
  draws.forEach((d, i) => {
    if (d.nr !== i + 1) throw new Error(`${name}: luka w numeracji przy losowaniu ${d.nr}`);
  });
  return draws;
}

async function readExisting(file) {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch (e) {
    if (e.code === 'ENOENT') return [];
    throw e;
  }
}

// Jedno losowanie na linię – czytelne diffy w gicie.
const serialize = (draws) => `[\n${draws.map((d) => '  ' + JSON.stringify(d)).join(',\n')}\n]\n`;

await mkdir('data', { recursive: true });

for (const { name, url, file } of SOURCES) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status} dla ${url}`);
  const fetched = parse(await res.text(), name);

  const existing = await readExisting(file);
  const byNr = new Map(existing.map((d) => [d.nr, d]));
  for (const d of fetched) {
    const old = byNr.get(d.nr);
    if (!old) byNr.set(d.nr, d);
    else if (old.date !== d.date || old.numbers.join() !== d.numbers.join()) {
      console.warn(`${name}: losowanie ${d.nr} różni się od zapisanego – zostawiam zapisane`);
    }
  }

  const merged = [...byNr.values()].sort((a, b) => a.nr - b.nr);
  const added = merged.length - existing.length;
  await writeFile(file, serialize(merged));
  const last = merged.at(-1);
  console.log(`${name}: +${added}, razem ${merged.length}, ostatnie ${last.nr} (${last.date}) ${last.numbers.join(',')}`);
}
