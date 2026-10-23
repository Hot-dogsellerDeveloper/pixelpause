'use strict';
const target = document.querySelector('#target');
const title = document.querySelector('#target-title');
const hint = document.querySelector('#target-hint');
const status = document.querySelector('#status');
const last = document.querySelector('#last');
const bestLabel = document.querySelector('#best');
const progress = document.querySelector('#progress');
let state = 'idle';
let timer;
let signalTime = 0;
let samples = [];
let best = null;
try {
  const stored = localStorage.getItem('pixelpause-best-median');
  const value = Number(stored);
  if (stored !== null && Number.isFinite(value) && value > 0) best = value;
} catch { /* The game also works when browser storage is blocked. */ }
function renderMs(element, value) {
  element.replaceChildren(document.createTextNode(value === null ? '— ' : `${value} `));
  const unit = document.createElement('small');
  unit.textContent = 'ms';
  element.append(unit);
}
renderMs(bestLabel, best);
function display(next, text, detail, message) {
  state = next;
  target.dataset.state = next;
  title.textContent = text;
  hint.textContent = detail;
  status.textContent = message;
}
function queue() {
  clearTimeout(timer);
  display('waiting', 'Noch warten …', 'Gleich wird es grün', 'Zu frühes Tippen wiederholt diesen Versuch.');
  timer = setTimeout(() => {
    display('ready', 'Jetzt!', 'So schnell wie möglich tippen', 'Die Zeit läuft.');
    signalTime = performance.now();
  }, 1500 + Math.random() * 2500);
}
function reset() {
  clearTimeout(timer);
  samples = [];
  progress.textContent = '0 von 5';
  renderMs(last, null);
  display('idle', 'Los geht’s', 'Tippe, um zu starten', 'Erst tippen, wenn die Fläche grün wird.');
}
target.addEventListener('click', () => {
  if (state === 'idle' || state === 'between') return queue();
  if (state === 'complete') { reset(); return queue(); }
  if (state === 'waiting') {
    clearTimeout(timer);
    return display('between', 'Zu früh!', 'Tippe für einen neuen Versuch', 'Kein Problem. Dieser Versuch zählt nicht.');
  }
  if (state !== 'ready') return;
  const elapsed = Math.max(1, Math.round(performance.now() - signalTime));
  samples.push(elapsed);
  renderMs(last, elapsed);
  progress.textContent = `${samples.length} von 5`;
  if (samples.length < 5) return display('between', `${elapsed} ms`, 'Tippe für die nächste Runde', `Noch ${5 - samples.length} Versuche bis zu deinem Ergebnis.`);
  const median = [...samples].sort((a, b) => a - b)[2];
  const record = best === null || median < best;
  if (record) {
    best = median;
    renderMs(bestLabel, best);
    try { localStorage.setItem('pixelpause-best-median', String(best)); } catch { /* Storage is optional. */ }
  }
  display('complete', `${median} ms`, 'Dein Median · Tippen zum Wiederholen', record ? 'Neuer persönlicher Rekord!' : 'Fünf Versuche geschafft. Noch eine Runde?');
});
document.querySelector('#reset').addEventListener('click', reset);
document.addEventListener('visibilitychange', () => {
  if (document.hidden && (state === 'waiting' || state === 'ready')) {
    clearTimeout(timer);
    display('between', 'Kurz pausiert', 'Tippe zum Weitermachen', 'Der unterbrochene Versuch zählt nicht.');
  }
});
