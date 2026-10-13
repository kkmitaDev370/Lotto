import { STRATEGIES, RANDOM_DIST, trackerFor, backtest, countHits, nextDrawDate } from './strategies.js';

// Na GitHub Pages dane idą prosto z repo (zawsze świeże po commicie joba), lokalnie z ../data.
const DATA = location.hostname.endsWith('github.io')
  ? 'https://raw.githubusercontent.com/kkmitaDev370/Lotto/master/data/'
  : '../data/';

const $ = (id) => document.getElementById(id);
const fmtDate = (iso) => iso.split('-').reverse().join('.');
const pct = (x) => `${(x * 100).toFixed(2).replace('.', ',')}%`;
const dec = (x, d = 3) => x.toFixed(d).replace('.', ',');

const balls = (nums, { hit = [], cls = '', sm = false } = {}) =>
  `<span class="balls${sm ? ' sm' : ''}">${nums
    .map((n) => `<span class="ball ${hit.includes(n) ? 'hit' : cls}">${n}</span>`)
    .join('')}</span>`;

async function load(name, optional = false) {
  const res = await fetch(`${DATA}${name}.json`, { cache: 'no-cache' });
  if (!res.ok) {
    if (optional && res.status === 404) return [];
    throw new Error(`${name}.json: HTTP ${res.status}`);
  }
  return res.json();
}

const [lotto, plus, predictions] = await Promise.all([
  load('lotto'),
  load('lotto_plus'),
  load('predictions', true),
]).catch((e) => {
  $('status').textContent = `Nie udało się wczytać danych: ${e.message}`;
  throw e;
});

const plusByDate = new Map(plus.map((d) => [d.date, d]));
const lottoByNr = new Map(lotto.map((d) => [d.nr, d]));
const last = lotto.at(-1);
const tracker = trackerFor(lotto);

$('status').innerHTML =
  `Ostatnie losowanie: <strong>nr ${last.nr}</strong>, ${fmtDate(last.date)} · ${lotto.length} losowań Lotto od ${fmtDate(lotto[0].date)}`;

renderNext();
renderRecord();
renderBacktest();
renderFreq();
renderGaps();
renderPairs();
renderRecent();

function renderNext() {
  const nr = last.nr + 1;
  const saved = predictions.find((p) => p.nr === nr);
  const picks = saved?.picks ?? tracker.picks();
  const date = saved?.date ?? nextDrawDate(last.date);
  $('next-meta').textContent = saved
    ? `Losowanie nr ${nr}, ${fmtDate(date)} · zapisane ${new Date(saved.createdAt).toLocaleString('pl-PL')}`
    : `Losowanie nr ${nr}, ${fmtDate(date)} · podgląd, job jeszcze nie zapisał typów`;
  $('next-cards').innerHTML = STRATEGIES.map(
    (s) => `<div class="card"><h3>${s.name}</h3><p>${s.desc}</p>${
      picks[s.id] ? balls(picks[s.id]) : '<p>losowane przy zapisie</p>'
    }</div>`,
  ).join('');
}

function renderRecord() {
  const settled = predictions
    .map((p) => ({ ...p, draw: lottoByNr.get(p.nr) }))
    .filter((p) => p.draw);
  const pending = predictions.filter((p) => !lottoByNr.has(p.nr));

  $('record').innerHTML = STRATEGIES.map((s) => {
    const hits = settled.map((p) => countHits(p.picks[s.id], p.draw.numbers));
    const total = hits.reduce((a, b) => a + b, 0);
    const wins = hits.filter((h) => h >= 3).length;
    return `<div class="card"><h3>${s.name}</h3>
      <p>${settled.length ? `${settled.length} losowań · średnio ${dec(total / settled.length, 2)} traf.` : 'brak rozliczonych losowań'}</p>
      <p class="big">${total} traf.</p><p>wygrane (3+): ${wins}</p></div>`;
  }).join('');

  const rows = [...pending, ...settled.reverse()];
  if (!rows.length) {
    $('history').innerHTML = '<tr><td>Jeszcze nic nie zapisano.</td></tr>';
    return;
  }
  $('history').innerHTML =
    `<thead><tr><th>Losowanie</th>${STRATEGIES.map((s) => `<th>${s.name}</th>`).join('')}</tr></thead><tbody>` +
    rows
      .map((p) => {
        const d = p.draw;
        const pl = d && plusByDate.get(d.date);
        const head = d
          ? `nr ${p.nr}, ${fmtDate(d.date)}<br>${balls(d.numbers, { cls: 'drawn', sm: true })}`
          : `nr ${p.nr}, ${fmtDate(p.date)}<br><span class="plus">czeka na losowanie</span>`;
        const cells = STRATEGIES.map((s) => {
          const pick = p.picks[s.id];
          if (!d) return `<td>${balls(pick, { sm: true })}</td>`;
          const h = countHits(pick, d.numbers);
          const plusInfo = pl ? `<br><span class="plus">Plus: ${countHits(pick, pl.numbers)} traf.</span>` : '';
          return `<td>${balls(pick, { hit: d.numbers, sm: true })}<span class="hits${h >= 3 ? ' win' : ''}">${h}</span>${plusInfo}</td>`;
        }).join('');
        return `<tr><td>${head}</td>${cells}</tr>`;
      })
      .join('') +
    '</tbody>';
}

function renderBacktest() {
  const bt = backtest(lotto);
  $('backtest-meta').textContent =
    `${bt.draws} losowań od ${fmtDate(bt.from.date)} – typ na każde liczony tylko z danych sprzed niego.`;
  const row = (name, dist, cls = '') => {
    const mean = dist.reduce((a, p, k) => a + p * k, 0);
    const ge = (m) => dist.slice(m).reduce((a, b) => a + b, 0);
    return `<tr class="${cls}"><td>${name}</td><td class="num">${dec(mean)}</td><td class="num">${pct(ge(3))}</td><td class="num">${pct(ge(4))}</td><td class="num">${pct(ge(5))}</td></tr>`;
  };
  const norm = (d) => d.map((c) => c / bt.draws);
  $('backtest').innerHTML =
    '<thead><tr><th>Strategia</th><th class="num">Śr. trafień</th><th class="num">3+ (wygrana)</th><th class="num">4+</th><th class="num">5+</th></tr></thead><tbody>' +
    STRATEGIES.filter((s) => s.id !== 'random').map((s) => row(s.name, norm(bt.dist[s.id]))).join('') +
    row('Losowy typ (teoretycznie)', RANDOM_DIST, 'baseline') +
    '</tbody>';
}

function renderFreq() {
  const state = { range: 'all', sort: 'nr' };
  const bind = (id, key) =>
    $(id).addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      state[key] = b.dataset.v;
      for (const x of $(id).children) x.setAttribute('aria-pressed', String(x === b));
      draw();
    });
  bind('freq-range', 'range');
  bind('freq-sort', 'sort');
  draw();

  function draw() {
    const draws = state.range === 'all' ? lotto : lotto.slice(-Number(state.range));
    const counts = Array(50).fill(0);
    for (const d of draws) for (const k of d.numbers) counts[k]++;
    const items = Array.from({ length: 49 }, (_, i) => ({ n: i + 1, c: counts[i + 1] }));
    if (state.sort === 'count') items.sort((a, b) => b.c - a.c || a.n - b.n);
    const expected = (draws.length * 6) / 49;

    const W = 900, H = 260, L = 36, R = 8, T = 10, B = 26;
    const max = Math.max(...items.map((i) => i.c)) * 1.05;
    const step = (W - L - R) / 49;
    const bw = Math.max(step - 2, 2);
    const y = (v) => T + (H - T - B) * (1 - v / max);
    const ticks = niceTicks(max);

    const svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Częstość liczb">
      ${ticks.map((t) => `<line class="gridline" x1="${L}" x2="${W - R}" y1="${y(t)}" y2="${y(t)}"/><text x="${L - 6}" y="${y(t) + 4}" text-anchor="end">${t}</text>`).join('')}
      ${items.map((it, i) => {
        const x = L + i * step + (step - bw) / 2;
        const h = Math.max(H - B - y(it.c), 0);
        return `<path class="bar" data-i="${i}" d="${topRounded(x, H - B - h, bw, h, Math.min(4, bw / 2))}"/>
          <text x="${x + bw / 2}" y="${H - 8}" text-anchor="middle">${it.n}</text>`;
      }).join('')}
      <line class="baseline" x1="${L}" x2="${W - R}" y1="${H - B}" y2="${H - B}"/>
      <line class="expected" x1="${L}" x2="${W - R}" y1="${y(expected)}" y2="${y(expected)}"/>
      <text x="${W - R}" y="${y(expected) - 5}" text-anchor="end">średnio ${Math.round(expected)}</text>
      <rect x="${L}" y="${T}" width="${W - L - R}" height="${H - T - B}" fill="transparent" class="hit-area"/>
    </svg>`;
    $('freq').innerHTML = svg;

    const el = $('freq').querySelector('svg');
    const bars = el.querySelectorAll('.bar');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const i = Math.floor(((e.clientX - r.left) * (W / r.width) - L) / step);
      const it = items[i];
      if (!it) return hideTip();
      bars.forEach((b, j) => b.classList.toggle('dim', j !== i));
      const diff = it.c - expected;
      showTip(e, `<strong>${it.n}</strong>: ${it.c} razy · ${pct(it.c / draws.length)} losowań · ${diff >= 0 ? '+' : ''}${Math.round(diff)} vs średnia`);
    });
    el.addEventListener('pointerleave', () => {
      bars.forEach((b) => b.classList.remove('dim'));
      hideTip();
    });
  }
}

function renderGaps() {
  const gaps = Array.from({ length: 49 }, (_, i) => tracker.gap(i + 1));
  const max = Math.max(...gaps);
  $('gaps').innerHTML = gaps
    .map((g, i) => {
      const mix = Math.round(8 + 82 * (g / max));
      const color = mix >= 55 ? '#fff' : 'var(--ink)';
      const label = g === 0 ? 'ostatnio' : `${g} temu`;
      return `<div style="background:color-mix(in oklab, var(--accent) ${mix}%, var(--surface));color:${color}" title="${i + 1}: ${g === 0 ? 'padła w ostatnim losowaniu' : `nie padła od ${g} losowań`}">${i + 1}<small>${label}</small></div>`;
    })
    .join('');
}

function renderPairs() {
  const counts = new Map();
  for (const d of lotto) {
    const n = d.numbers;
    for (let i = 0; i < 6; i++)
      for (let j = i + 1; j < 6; j++) {
        const [a, b] = n[i] < n[j] ? [n[i], n[j]] : [n[j], n[i]];
        const key = a * 100 + b;
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
  }
  $('pairs').innerHTML = [...counts]
    .sort((a, b) => b[1] - a[1] || a[0] - b[0])
    .slice(0, 10)
    .map(([key, c]) => `<li>${balls([Math.floor(key / 100), key % 100], { sm: true })}${c} razy</li>`)
    .join('');
}

function renderRecent() {
  $('recent').innerHTML =
    '<thead><tr><th>Nr</th><th>Data</th><th>Lotto</th><th>Lotto Plus</th></tr></thead><tbody>' +
    lotto
      .slice(-10)
      .reverse()
      .map((d) => {
        const pl = plusByDate.get(d.date);
        return `<tr><td class="num">${d.nr}</td><td>${fmtDate(d.date)}</td><td>${balls(d.numbers, { cls: 'drawn', sm: true })}</td><td>${pl ? balls(pl.numbers, { sm: true }) : '–'}</td></tr>`;
      })
      .join('') +
    '</tbody>';
}

function niceTicks(max) {
  const raw = max / 4;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 5, 10].map((m) => m * mag).find((s) => s >= raw);
  const out = [];
  for (let v = 0; v <= max; v += step) out.push(v);
  return out;
}

// Słupek zaokrąglony tylko u góry, przy osi płaski.
function topRounded(x, y, w, h, r) {
  if (h <= 0) return '';
  r = Math.min(r, h);
  return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
}

function showTip(e, html) {
  const t = $('tooltip');
  t.innerHTML = html;
  t.hidden = false;
  const pad = 12;
  const x = Math.min(e.clientX + pad, innerWidth - t.offsetWidth - pad);
  t.style.left = `${Math.max(pad, x)}px`;
  t.style.top = `${e.clientY - t.offsetHeight - pad}px`;
}

function hideTip() {
  $('tooltip').hidden = true;
}
