// Strategie typowania 6 liczb – wspólne dla joba (scripts/fetch.mjs) i strony (docs/app.js).

export const HOT_WINDOW = 50;

export const STRATEGIES = [
  { id: 'hot', name: 'Gorące', desc: `najczęstsze w ostatnich ${HOT_WINDOW} losowaniach` },
  { id: 'cold', name: 'Zimne', desc: 'najdłużej niewylosowane' },
  { id: 'top', name: 'Najczęstsze', desc: 'najczęstsze w całej historii' },
  { id: 'random', name: 'Losowe', desc: 'czysty przypadek – punkt odniesienia' },
  { id: 'own', name: 'Własny typ', desc: 'wybierany ręcznie przed losowaniem', manual: true },
];

export const AUTO_IDS = ['hot', 'cold', 'top', 'random'];

const NUMBERS = Array.from({ length: 49 }, (_, i) => i + 1);

// Stan statystyk aktualizowany losowanie po losowaniu (żeby test na historii był liniowy).
export class Tracker {
  constructor() {
    this.n = 0;
    this.total = Array(50).fill(0);
    this.recent = Array(50).fill(0);
    this.lastSeen = Array(50).fill(-1);
    this.window = [];
  }

  add(numbers) {
    for (const k of numbers) {
      this.total[k]++;
      this.recent[k]++;
      this.lastSeen[k] = this.n;
    }
    this.window.push(numbers);
    if (this.window.length > HOT_WINDOW) for (const k of this.window.shift()) this.recent[k]--;
    this.n++;
  }

  // Ile losowań minęło od ostatniego wystąpienia liczby (0 = padła w ostatnim).
  gap(k) {
    return this.n - 1 - this.lastSeen[k];
  }

  // Deterministyczne typy na następne losowanie; remisy rozstrzyga kolejna miara, potem mniejsza liczba.
  picks() {
    const top6 = (...keys) =>
      [...NUMBERS]
        .sort((a, b) => {
          for (const key of keys) if (key(b) !== key(a)) return key(b) - key(a);
          return a - b;
        })
        .slice(0, 6)
        .sort((a, b) => a - b);
    return {
      hot: top6((k) => this.recent[k], (k) => this.total[k]),
      cold: top6((k) => this.gap(k), (k) => -this.total[k]),
      top: top6((k) => this.total[k]),
    };
  }
}

export function randomPicks() {
  const pool = [...NUMBERS];
  const out = [];
  const buf = new Uint32Array(1);
  while (out.length < 6) {
    crypto.getRandomValues(buf);
    out.push(pool.splice(buf[0] % pool.length, 1)[0]);
  }
  return out.sort((a, b) => a - b);
}

export function trackerFor(draws) {
  const t = new Tracker();
  for (const d of draws) t.add(d.numbers);
  return t;
}

export const countHits = (picks, numbers) => picks.filter((k) => numbers.includes(k)).length;

// P(k trafień) przy losowym typie: C(6,k)·C(43,6−k)/C(49,6).
const binom = (n, k) => {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
};
export const RANDOM_DIST = Array.from({ length: 7 }, (_, k) => (binom(6, k) * binom(43, 6 - k)) / binom(49, 6));

// Wsteczny test: dla każdego losowania od `start` liczy typy wyłącznie z wcześniejszych danych.
export function backtest(draws, start = 1000) {
  const t = trackerFor(draws.slice(0, start));
  const ids = ['hot', 'cold', 'top'];
  const dist = Object.fromEntries(ids.map((id) => [id, Array(7).fill(0)]));
  for (let i = start; i < draws.length; i++) {
    const p = t.picks();
    for (const id of ids) dist[id][countHits(p[id], draws[i].numbers)]++;
    t.add(draws[i].numbers);
  }
  return { draws: draws.length - start, from: draws[start], dist };
}

// Najbliższy wtorek/czwartek/sobota po dacie ostatniego losowania (YYYY-MM-DD).
export function nextDrawDate(lastDate) {
  const d = new Date(`${lastDate}T12:00:00Z`);
  do d.setUTCDate(d.getUTCDate() + 1);
  while (![2, 4, 6].includes(d.getUTCDay()));
  return d.toISOString().slice(0, 10);
}
