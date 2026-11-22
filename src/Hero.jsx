import { useCallback, useEffect, useRef, useState } from 'react';
import portrait from './assets/desk-portrait.jpg';
import goofyPortrait from './assets/desk-goofy.webp';
import { work } from './work.js';

// Desk plane in design pixels. Everything on the desk is positioned inside it.
const DESK = { width: 1560, height: 880 };
// Point the camera centres on when the viewport is narrower than the desk (the name).
const HOME_FOCUS = { x: 560, y: 380 };

const framePlacement = {
  organisation: { pos: { left: 1060, top: 96 }, rotation: -3 },
  intent: { pos: { left: 1214, top: 432 }, rotation: 3.5 },
};
const projects = work.map(project => ({ ...project, image: project.cover, ...framePlacement[project.id] }));

// Slots for case studies that are still being written. They stay honest placeholders.
const drafts = [
  { id: 'draft-3', index: '03', pos: { left: 880, top: 690 }, rotation: 2 },
  { id: 'draft-4', index: '04', pos: { left: 150, top: 768 }, rotation: -2.5 },
];

const fileNames = [
  ['final.fig', 'edited 4:12 pm'],
  ['final_v2.fig', 'edited 9:30 pm'],
  ['final_FINAL.fig', 'edited 11:58 pm'],
  ['final_FINAL_use-this-one.fig', 'edited 12:47 am'],
  ['final_FINAL_use-this-one (1).fig', 'edited 12:49 am'],
];

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
let topLayer = 10;

/* ---------- a desk object you can pick up ---------- */

function DeskItem({ id, registry, camera, onMoved, pos, rotation = 0, className = '', children, label }) {
  const element = useRef(null);
  const s = useRef({ x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, tilt: 0, lift: 1, liftTarget: 1, spin: 0, spinV: 0, frame: 0 });
  const press = useRef(null);
  const dragged = useRef(false);

  const render = useCallback(() => {
    const st = s.current;
    element.current.style.transform = `translate(${st.x}px, ${st.y}px) rotate(${rotation + st.tilt + st.spin}deg) scale(${st.lift})`;
  }, [rotation]);

  const step = useCallback(() => {
    const st = s.current;
    const dragging = !!press.current?.active;
    const stiffness = dragging ? 0.2 : 0.085;
    const damping = dragging ? 0.62 : 0.8;
    st.vx = (st.vx + (st.tx - st.x) * stiffness) * damping;
    st.vy = (st.vy + (st.ty - st.y) * stiffness) * damping;
    st.x += st.vx;
    st.y += st.vy;
    st.tilt += (clamp(st.vx * 0.7, -9, 9) - st.tilt) * 0.2;
    st.lift += (st.liftTarget - st.lift) * 0.25;
    st.spinV = (st.spinV - st.spin * 0.12) * 0.82;
    st.spin += st.spinV;
    render();
    const resting = !dragging && Math.abs(st.tx - st.x) + Math.abs(st.ty - st.y) < 0.2
      && Math.abs(st.vx) + Math.abs(st.vy) < 0.05 && Math.abs(st.tilt) < 0.05
      && Math.abs(st.lift - st.liftTarget) < 0.002 && Math.abs(st.spin) + Math.abs(st.spinV) < 0.02;
    if (resting) {
      Object.assign(st, { x: st.tx, y: st.ty, vx: 0, vy: 0, tilt: 0, spin: 0, spinV: 0, lift: st.liftTarget, frame: 0 });
      render();
      return;
    }
    st.frame = requestAnimationFrame(step);
  }, [render]);

  const wake = useCallback(() => {
    const st = s.current;
    if (reduceMotion()) {
      Object.assign(st, { x: st.tx, y: st.ty, vx: 0, vy: 0, tilt: 0, spin: 0, lift: st.liftTarget });
      render();
      return;
    }
    if (!st.frame) st.frame = requestAnimationFrame(step);
  }, [render, step]);

  useEffect(() => {
    registry.current[id] = {
      nudge(dx, dy, spin = 0) { const st = s.current; st.tx += dx; st.ty += dy; st.vx += dx * 0.25; st.spinV += spin; wake(); },
      wiggle() { s.current.spinV += 3.2; wake(); },
      reset() { const st = s.current; st.tx = 0; st.ty = 0; wake(); },
    };
    const st = s.current;
    return () => { cancelAnimationFrame(st.frame); delete registry.current[id]; };
  }, [id, registry, wake]);

  function down(event) {
    if (event.button !== 0) return;
    event.stopPropagation();
    press.current = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY, active: false };
    dragged.current = false;
  }

  function move(event) {
    const p = press.current;
    if (!p || p.id !== event.pointerId) return;
    if (!p.active) {
      if (Math.hypot(event.clientX - p.startX, event.clientY - p.startY) < 5) return;
      // Only capture once it is clearly a drag, so plain clicks still reach links and buttons.
      p.active = true;
      dragged.current = true;
      element.current.setPointerCapture(event.pointerId);
      element.current.classList.add('is-lifted');
      element.current.style.zIndex = ++topLayer;
      s.current.liftTarget = 1.045;
      onMoved();
    }
    const scale = camera.current.s;
    const st = s.current;
    st.tx += (event.clientX - p.x) / scale;
    st.ty += (event.clientY - p.y) / scale;
    p.x = event.clientX;
    p.y = event.clientY;
    wake();
  }

  function up(event) {
    const p = press.current;
    if (!p || p.id !== event.pointerId) return;
    press.current = null;
    if (!p.active) return;
    const st = s.current;
    // A little throw, then the spring settles it with a small overshoot.
    st.tx += st.vx * 5;
    st.ty += st.vy * 5;
    st.liftTarget = 1;
    element.current.classList.remove('is-lifted');
    wake();
  }

  return <div ref={element} className={`desk-item ${className}`} data-id={id} aria-label={label}
    style={{ left: pos.left, top: pos.top, transform: `rotate(${rotation}deg)` }}
    onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
    onClickCapture={(event) => { if (dragged.current) { event.preventDefault(); event.stopPropagation(); dragged.current = false; } }}>
    {children}
  </div>;
}

/* ---------- the individual objects ---------- */

function Photo() {
  const [goofy, setGoofy] = useState(false);
  return <button type="button" className={'photo-stack' + (goofy ? ' is-goofy' : '')} onClick={() => setGoofy(v => !v)}
    aria-pressed={goofy} aria-label="Swap for the outtake photo">
    <img className="photo-regular" src={portrait} alt="Temporary portrait" draggable="false" />
    <img className="photo-goofy" src={goofyPortrait} alt="" draggable="false" />
    <span className="photo-caption">{goofy ? 'ok, that one’s worse' : 'hover for the outtake'}</span>
  </button>;
}

function FileLabel() {
  const [version, setVersion] = useState(3);
  const [name, edited] = fileNames[version];
  return <button type="button" className="file-tag" onClick={() => setVersion(v => (v + 1) % fileNames.length)}
    title="Click to save another version">
    <span className="file-icon" aria-hidden="true">◆</span>
    <span><span className="file-name">{name}</span><small>{edited} · click to “save”</small></span>
  </button>;
}

function MusicPlayer() {
  const length = 212;
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(70);
  useEffect(() => {
    if (!playing) return undefined;
    const tick = window.setInterval(() => setTime(t => (t + 1) % length), 1000);
    return () => window.clearInterval(tick);
  }, [playing]);
  const format = t => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
  return <div className={'player' + (playing ? ' is-playing' : '')}>
    <button type="button" className="player-toggle" onClick={() => setPlaying(v => !v)} aria-pressed={playing}
      aria-label={playing ? 'Pause' : 'Play'}>{playing ? '❚❚' : '▶'}</button>
    <span className="player-meta">
      <small>{playing ? 'now playing' : 'on repeat'}</small>
      <span className="player-song">Jazz et thé vert</span>
      <span className="player-bar"><span style={{ width: `${time / length * 100}%` }} /></span>
    </span>
    <span className="player-eq" aria-hidden="true"><i /><i /><i /><i /></span>
    <span className="player-time">{format(time)}</span>
  </div>;
}

function StickyNote({ flipped, onFlip }) {
  return <button type="button" className={'sticky' + (flipped ? ' is-flipped' : '')} onClick={onFlip} aria-pressed={flipped}>
    <span className="sticky-face">{flipped ? 'Then why is there a tutorial?' : '“It’s intuitive.”'}</span>
    <small>{flipped ? 'tap to un-ask' : 'tap for the reply'}</small>
  </button>;
}

/* ---------- hero ---------- */

export function Hero({ ready = true }) {
  const viewport = useRef(null);
  const plane = useRef(null);
  const cursor = useRef(null);
  const registry = useRef({});
  const camera = useRef({ x: 0, y: 0, s: 1, base: 1, home: { x: 0, y: 0 }, frame: 0 });
  const pan = useRef(null);
  const [moved, setMoved] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [opening, setOpening] = useState(null);
  const [draftNote, setDraftNote] = useState(null);

  const applyCamera = useCallback(() => {
    const cam = camera.current;
    if (!plane.current || !viewport.current) return;
    plane.current.style.transform = `translate(-50%, -50%) translate(${cam.x}px, ${cam.y}px) scale(${cam.s})`;
    const grid = 24 * cam.s;
    const vp = viewport.current;
    // Keep the dot grid locked to the desk so panning feels like moving paper.
    vp.style.backgroundSize = `${grid}px ${grid}px`;
    vp.style.backgroundPosition = `${vp.clientWidth / 2 + cam.x - DESK.width / 2 * cam.s}px ${vp.clientHeight / 2 + cam.y - DESK.height / 2 * cam.s}px`;
  }, []);

  const limits = useCallback(() => {
    const vp = viewport.current;
    const cam = camera.current;
    return {
      x: Math.max(0, (DESK.width * cam.s - vp.clientWidth) / 2) + 160,
      y: Math.max(0, (DESK.height * cam.s - vp.clientHeight) / 2) + 120,
    };
  }, []);

  const springCamera = useCallback((target, { overshoot = false, done } = {}) => {
    const cam = camera.current;
    cancelAnimationFrame(cam.frame);
    if (reduceMotion()) {
      Object.assign(cam, target);
      applyCamera();
      done?.();
      return;
    }
    const v = { x: 0, y: 0, s: 0 };
    const k = overshoot ? 0.075 : 0.09;
    const d = overshoot ? 0.78 : 0.72;
    let fired = false;
    const started = performance.now();
    const tick = () => {
      let energy = 0;
      for (const key of ['x', 'y', 's']) {
        const scale = key === 's' ? 400 : 1;
        v[key] = (v[key] + (target[key] - cam[key]) * k) * d;
        cam[key] += v[key];
        energy += (Math.abs(v[key]) + Math.abs(target[key] - cam[key])) * scale;
      }
      applyCamera();
      if (done && !fired && performance.now() - started > 620) { fired = true; done(); }
      if (energy > 0.3) cam.frame = requestAnimationFrame(tick);
      else { Object.assign(cam, target); applyCamera(); cam.frame = 0; }
    };
    cam.frame = requestAnimationFrame(tick);
  }, [applyCamera]);

  // Fit the desk to the viewport and frame the name on narrow screens.
  useEffect(() => {
    const fit = () => {
      const vp = viewport.current;
      if (!vp) return;
      const cam = camera.current;
      const atHome = Math.abs(cam.x - cam.home.x) < 1 && Math.abs(cam.y - cam.home.y) < 1 && Math.abs(cam.s - cam.base) < 0.001;
      const base = clamp(Math.min(vp.clientWidth / DESK.width, vp.clientHeight / DESK.height), 0.56, 1);
      const spareX = Math.max(0, (DESK.width * base - vp.clientWidth) / 2);
      const spareY = Math.max(0, (DESK.height * base - vp.clientHeight) / 2);
      const home = {
        x: clamp(-(HOME_FOCUS.x - DESK.width / 2) * base, -spareX, spareX),
        y: clamp(-(HOME_FOCUS.y - DESK.height / 2) * base, -spareY, spareY),
      };
      cam.base = base;
      cam.home = home;
      if (atHome || !cam.ready) Object.assign(cam, home, { s: base, ready: true });
      applyCamera();
    };
    const observer = new ResizeObserver(fit);
    observer.observe(viewport.current);
    fit();
    const cam = camera.current;
    return () => { observer.disconnect(); cancelAnimationFrame(cam.frame); };
  }, [applyCamera]);

  // Khushi's cursor wanders in, taps the sticky note, and parks beside it.
  useEffect(() => {
    const el = cursor.current;
    if (!el || !ready) return undefined;
    const park = 'translate(1046px, 618px)';
    if (reduceMotion()) { el.style.transform = park; return undefined; }
    let cancelled = false;
    const timers = [];
    const wait = ms => new Promise(resolve => timers.push(window.setTimeout(resolve, ms)));
    (async () => {
      await wait(900);
      if (cancelled) return;
      const path = el.animate([
        { transform: 'translate(-120px, 820px)' },
        { transform: 'translate(260px, 760px)', offset: 0.3 },
        { transform: 'translate(640px, 640px)', offset: 0.62 },
        { transform: 'translate(930px, 540px)', offset: 0.88 },
        { transform: 'translate(962px, 520px)' },
      ], { duration: 2300, easing: 'cubic-bezier(.45,.05,.3,1)', fill: 'forwards' });
      await path.finished.catch(() => {});
      if (cancelled) return;
      el.classList.add('is-pressing');
      await wait(170);
      if (cancelled) return;
      el.classList.remove('is-pressing');
      registry.current.sticky?.nudge(28, 12, 6);
      setFlipped(true);
      await wait(350);
      if (cancelled) return;
      el.animate([{ transform: 'translate(962px, 520px)' }, { transform: park }],
        { duration: 900, easing: 'cubic-bezier(.3,.7,.3,1)', fill: 'forwards' });
    })();
    return () => { cancelled = true; timers.forEach(window.clearTimeout); el.getAnimations().forEach(a => a.cancel()); };
  }, [ready]);

  const markMoved = useCallback(() => setMoved(true), []);

  function panDown(event) {
    if (event.button !== 0 || event.target.closest('.desk-item, a, button')) return;
    cancelAnimationFrame(camera.current.frame);
    pan.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    viewport.current.setPointerCapture(event.pointerId);
    viewport.current.classList.add('is-panning');
  }

  function panMove(event) {
    const p = pan.current;
    if (!p || p.id !== event.pointerId) return;
    const cam = camera.current;
    const bound = limits();
    cam.x = clamp(cam.x + event.clientX - p.x, cam.home.x - bound.x, cam.home.x + bound.x);
    cam.y = clamp(cam.y + event.clientY - p.y, cam.home.y - bound.y, cam.home.y + bound.y);
    p.x = event.clientX;
    p.y = event.clientY;
    applyCamera();
    setMoved(true);
  }

  function panUp(event) {
    if (!pan.current || pan.current.id !== event.pointerId) return;
    pan.current = null;
    viewport.current.classList.remove('is-panning');
  }

  function recenter() {
    const cam = camera.current;
    springCamera({ x: cam.home.x, y: cam.home.y, s: cam.base });
  }

  function tidy() {
    Object.values(registry.current).forEach(item => item.reset());
    recenter();
    setMoved(false);
  }

  function openProject(event, project) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
    event.preventDefault();
    if (opening) return;
    const cam = camera.current;
    const vp = viewport.current.getBoundingClientRect();
    const box = event.currentTarget.getBoundingClientRect();
    // Desk-space offset of the frame from the desk's centre, then zoom so it fills most of the view.
    const centreX = vp.left + vp.width / 2 + cam.x;
    const centreY = vp.top + vp.height / 2 + cam.y;
    const dx = (box.left + box.width / 2 - centreX) / cam.s;
    const dy = (box.top + box.height / 2 - centreY) / cam.s;
    const s = Math.min(vp.width * 0.86 / (box.width / cam.s), vp.height * 0.86 / (box.height / cam.s), 3.2);
    setOpening(project.id);
    springCamera({ x: -dx * s, y: -dy * s, s }, { overshoot: true, done: () => { window.location.href = project.href; } });
  }

  function focusItem(event) {
    // Keyboard users: bring a focused object into view instead of letting the browser scroll the clip box.
    const item = event.target.closest('.desk-item');
    viewport.current.scrollLeft = 0;
    viewport.current.scrollTop = 0;
    if (!item || pan.current) return;
    const vp = viewport.current.getBoundingClientRect();
    const box = item.getBoundingClientRect();
    if (box.left >= vp.left && box.right <= vp.right && box.top >= vp.top && box.bottom <= vp.bottom) return;
    const cam = camera.current;
    springCamera({
      x: cam.x + (vp.left + vp.width / 2) - (box.left + box.width / 2),
      y: cam.y + (vp.top + vp.height / 2) - (box.top + box.height / 2),
      s: cam.s,
    });
    setMoved(true);
  }

  function draftClick(draft) {
    registry.current[draft.id]?.wiggle();
    setDraftNote(draft.id);
  }

  const item = { registry, camera, onMoved: markMoved };

  return <section className={'desk-hero' + (opening ? ' is-opening' : '')} aria-labelledby="hero-title">
    <div className="desk-bar">
      <span><b aria-hidden="true">⌘</b> Drag the paper to look around. Pick anything up.</span>
      <span className="desk-bar-actions">
        {moved && <button type="button" onClick={tidy}>↺ Tidy up</button>}
      </span>
    </div>

    <div ref={viewport} className="desk-viewport" onPointerDown={panDown} onPointerMove={panMove} onPointerUp={panUp}
      onPointerCancel={panUp} onDoubleClick={(e) => { if (!e.target.closest('.desk-item')) recenter(); }} onFocus={focusItem}>
      <div ref={plane} className="desk-plane" style={{ width: DESK.width, height: DESK.height }}>

        <div className="desk-intro">
          <p className="desk-kicker">⁕ Product designer</p>
          <h1 id="hero-title">Khushi<span>Tiwari</span></h1>
          <p className="desk-bio">I turn complicated product decisions into clear, useful screens. Usually with too many tabs open and music playing.</p>
          <p className="desk-links"><a href="/about">About me ↗</a><a href="/resume">Resume ↗</a></p>
        </div>

        <DeskItem id="photo" {...item} className="desk-photo" pos={{ left: 812, top: 112 }} rotation={4.5}><Photo /></DeskItem>
        <DeskItem id="file" {...item} className="desk-file" pos={{ left: 70, top: 128 }} rotation={-4}><FileLabel /></DeskItem>
        <DeskItem id="player" {...item} className="desk-player" pos={{ left: 96, top: 640 }} rotation={2.5}><MusicPlayer /></DeskItem>
        <DeskItem id="sticky" {...item} className="desk-sticky" pos={{ left: 900, top: 420 }} rotation={-5}>
          <StickyNote flipped={flipped} onFlip={() => setFlipped(v => !v)} />
        </DeskItem>
        <DeskItem id="wireframe" {...item} className="desk-figma" pos={{ left: 540, top: 672 }} rotation={-2}>
          <span className="figma-bar"><i /><i /><i /><span>Organisation / wireframe v1</span></span>
          <img src="/assets/case-studies/org-1.png" alt="Early low-fidelity wireframe from the Organisation project" draggable="false" />
        </DeskItem>

        {projects.map(project =>
          <DeskItem key={project.id} id={project.id} {...item} className={'desk-frame' + (opening === project.id ? ' is-open' : '')}
            pos={project.pos} rotation={project.rotation}>
            <a href={project.href} onClick={(event) => openProject(event, project)}>
              <span className="frame-cover"><img src={project.image} alt="" draggable="false" /></span>
              <span className="frame-index">⁕ {project.index}</span>
              <strong>{project.title}</strong>
              <span className="frame-problem">{project.problem}</span>
              <span className="frame-open">Open the case study <b aria-hidden="true">▶</b></span>
            </a>
          </DeskItem>)}

        {drafts.map(draft =>
          <DeskItem key={draft.id} id={draft.id} {...item} className="desk-draft" pos={draft.pos} rotation={draft.rotation}>
            <button type="button" onClick={() => draftClick(draft)}>
              <span className="frame-index">⁕ {draft.index}</span>
              <strong>[Case study {draft.index}]</strong>
              <span className="frame-problem" aria-live="polite">{draftNote === draft.id ? 'Still writing this one up. Soon.' : '[one-line problem statement]'}</span>
            </button>
          </DeskItem>)}

        <div ref={cursor} className="khushi-cursor" aria-hidden="true">
          <svg viewBox="0 0 16 20" width="16" height="20"><path d="M1 1l13 10.5-6 .7 3.6 6.4-2.6 1.4-3.6-6.5L1 17.5z" /></svg>
          <span>Khushi</span>
        </div>
      </div>
    </div>
  </section>;
}
