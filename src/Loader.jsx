import { useEffect, useRef, useState } from 'react';
import './loader.css';

const SESSION_KEY = 'kt-desk-opened';
const NAME = 'Khushi Tiwari';
const MIN_TIME = 1500;
const MAX_TIME = 5000;
const messages = [
  [0, 'Opening product-designer.fig'],
  [0.25, 'Fetching fonts'],
  [0.5, 'Placing the sticky notes'],
  [0.72, 'Renaming final_FINAL.fig'],
  [0.92, 'Almost there'],
];

export function shouldShowLoader() {
  try { return !window.sessionStorage.getItem(SESSION_KEY); } catch { return true; }
}

// Waits for fonts and the images that are actually on screen in the hero.
function watchAssets(onProgress) {
  let done = 0;
  const tasks = [document.fonts?.ready ?? Promise.resolve()];
  document.querySelectorAll('.desk-hero img').forEach(img => {
    if (img.complete) return;
    tasks.push(new Promise(resolve => { img.addEventListener('load', resolve, { once: true }); img.addEventListener('error', resolve, { once: true }); }));
  });
  tasks.forEach(task => task.then(() => onProgress(++done / tasks.length)));
  return Promise.all(tasks);
}

export function Loader({ onDone }) {
  const root = useRef(null);
  const frame = useRef(null);
  const cursor = useRef(null);
  const size = useRef(null);
  const bar = useRef(null);
  const percent = useRef(null);
  const name = useRef(null);
  const [message, setMessage] = useState(messages[0][1]);
  const [leaving, setLeaving] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const started = performance.now();
    let assets = 0;
    let ready = false;
    let shown = 0;
    let raf = 0;
    let lastMessage = '';
    document.documentElement.classList.add('is-loading');

    watchAssets(p => { assets = p; }).then(() => { ready = true; });

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      cancelAnimationFrame(raf);
      try { window.sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* private mode: show again next time */ }
      setLeaving(true);
      document.documentElement.classList.remove('is-loading');
      window.setTimeout(onDone, still ? 150 : 620);
    };
    root.current.finish = finish;

    const tick = now => {
      const elapsed = Math.max(0, now - started);
      const time = Math.min(1, elapsed / (still ? 400 : MIN_TIME));
      // Never run ahead of the real assets, but never hang past MAX_TIME either.
      const target = elapsed > MAX_TIME ? 1 : Math.min(time, ready ? 1 : 0.35 + assets * 0.55);
      shown += (target - shown) * (still ? 1 : 0.18);
      if (target - shown < 0.002) shown = target;

      const anchor = frame.current.parentElement;
      const box = anchor.parentElement.getBoundingClientRect();
      const fullW = Math.min(420, box.width - 130);
      const fullH = Math.round(fullW * 0.6);
      // Anchor the frame's top-left so the finished frame ends up centred.
      anchor.style.transform = `translate(${(box.width - fullW) / 2}px, ${(box.height - fullH) / 2}px)`;
      const draw = still ? 1 : easeOut(Math.min(1, shown / 0.55));
      const w = Math.max(2, Math.round(fullW * draw));
      const h = Math.max(2, Math.round(fullH * draw));
      frame.current.style.width = `${w}px`;
      frame.current.style.height = `${h}px`;
      cursor.current.style.transform = `translate(${w}px, ${h}px)`;
      size.current.textContent = `${w} × ${h}`;
      const letters = Math.round(NAME.length * Math.max(0, Math.min(1, (shown - 0.5) / 0.38)));
      name.current.textContent = NAME.slice(0, letters);
      frame.current.classList.toggle('has-name', letters > 0);
      bar.current.style.transform = `scaleX(${shown})`;
      percent.current.textContent = `${Math.round(shown * 100)}%`;
      const next = ([...messages].reverse().find(([at]) => shown >= at) ?? messages[0])[1];
      if (next !== lastMessage) { lastMessage = next; setMessage(next); }

      if (shown >= 1) { raf = 0; window.setTimeout(finish, still ? 0 : 180); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const key = event => { if (event.key === 'Escape' || event.key === 'Enter') finish(); };
    window.addEventListener('keydown', key);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('keydown', key); document.documentElement.classList.remove('is-loading'); };
  }, [onDone]);

  return <div ref={root} className={'figma-loader' + (leaving ? ' is-leaving' : '')} role="status" aria-live="polite" aria-label="Loading Khushi Tiwari’s portfolio">
    <div className="loader-bar">
      <span className="loader-file"><span className="loader-file-icon" aria-hidden="true">K</span>Drafts <i>/</i> <b>product-designer.fig</b></span>
      <button type="button" className="loader-skip" onClick={() => root.current.finish?.()}>Skip <kbd>esc</kbd></button>
    </div>

    <div className="loader-stage">
      <div className="loader-anchor">
        <div ref={frame} className="loader-frame">
          <span className="loader-frame-name"># Home</span>
          <span className="loader-name"><span ref={name} /></span>
          <span className="loader-handles" aria-hidden="true"><i /><i /><i /><i /></span>
          <span className="loader-size" ref={size} aria-hidden="true">0 × 0</span>
        </div>
        <span ref={cursor} className="loader-cursor" aria-hidden="true">
          <svg viewBox="0 0 16 20" width="16" height="20"><path d="M1 1l13 10.5-6 .7 3.6 6.4-2.6 1.4-3.6-6.5L1 17.5z" /></svg>
          <span>Khushi</span>
        </span>
      </div>
    </div>

    <div className="loader-progress">
      <span className="loader-message">{message}<span className="loader-dots" aria-hidden="true">…</span></span>
      <span className="loader-percent" ref={percent}>0%</span>
      <span className="loader-track"><span ref={bar} /></span>
    </div>
  </div>;
}

function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
