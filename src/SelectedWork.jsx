import { useEffect, useRef, useState } from 'react';
import { work } from './work.js';
import './selected-work.css';

function Noodle() {
  // Prototype connection between two frames in a flow.
  return <svg className="noodle" viewBox="0 0 40 24" aria-hidden="true" preserveAspectRatio="none">
    <circle cx="3" cy="12" r="2.5" />
    <path d="M5 12 C 16 12, 22 12, 33 12" />
    <path d="M30 8 L35 12 L30 16" />
  </svg>;
}

function ProjectBoard({ project, flipped, khushi }) {
  const [active, setActive] = useState(project.start);
  const [comment, setComment] = useState(false);
  const screen = project.screens[active];
  const frameName = `${project.index} — ${project.title} / ${project.flowLabels[active]}`;

  return <article className={'board-row' + (flipped ? ' is-flipped' : '')} aria-labelledby={`${project.id}-board-title`}>
    <div className="board-canvas">
      <div className="frame-name"><span aria-hidden="true">#</span> {frameName}</div>

      <div className="board-frame">
        <a className="board-frame-link" href={project.href} aria-label={`Open the ${project.title} case study`}>
          <img src={screen.src} alt={screen.caption} width={screen.width} height={screen.height} loading="lazy" draggable="false" />
        </a>
        <span className="handles" aria-hidden="true"><i /><i /><i /><i /></span>
        <span className="frame-size" aria-hidden="true">{screen.width} × {screen.height}</span>

        {project.quote && <div className="comment" style={{ left: `${project.note.pin.x}%`, top: `${project.note.pin.y}%` }}>
          <button type="button" className={'comment-pin' + (comment ? ' is-open' : '')} onClick={() => setComment(v => !v)}
            aria-expanded={comment} aria-label={comment ? 'Close Khushi’s comment' : 'Open Khushi’s comment'}>K</button>
          {comment && <div className="comment-card" role="note">
            <p className="comment-who"><b>Khushi</b> · from the research</p>
            <p>{project.quote}</p>
          </div>}
          {khushi && !comment && <span className="board-cursor" aria-hidden="true">
            <svg viewBox="0 0 16 20" width="14" height="18"><path d="M1 1l13 10.5-6 .7 3.6 6.4-2.6 1.4-3.6-6.5L1 17.5z" /></svg>
            <span>Khushi</span>
          </span>}
        </div>}
      </div>

      <div className="board-sticky" aria-label="Project facts">
        <span>{project.facts.Role.replace(' (end-to-end)', '')}</span>
        <span>{project.facts.Timeline}</span>
        <span>{project.facts.Team}</span>
      </div>

      <ol className="flow" aria-label={`${project.title} flow`}>
        {project.screens.map((item, i) => <li key={item.src}>
          {i > 0 && <Noodle />}
          <button type="button" className={'flow-frame' + (i === active ? ' is-active' : '')} onClick={() => setActive(i)}
            aria-pressed={i === active} aria-label={`Show ${project.flowLabels[i]}: ${item.caption}`}>
            <span className="flow-label">{project.flowLabels[i]}</span>
            <span className="flow-thumb"><img src={item.src} alt="" loading="lazy" draggable="false" /></span>
          </button>
        </li>)}
      </ol>
    </div>

    <div className="board-text">
      <p className="board-index">⁕ {project.index} <span>{project.title}</span></p>
      <h3 id={`${project.id}-board-title`} className="text-layer" data-spec="Instrument Serif · 56">
        {project.headline[0]}<br /><em>{project.headline[1]}</em>
      </h3>
      <p className="board-summary">{project.summary}</p>
      <ul className="board-topics" aria-label="Topics">{project.topics.map(topic => <li key={topic}>{topic}</li>)}</ul>
      <a className="board-present" href={project.href}><b aria-hidden="true">▶</b> Open the case study<span className="sr-only">: {project.title}</span></a>
    </div>
  </article>;
}

export function SelectedWork() {
  const board = useRef(null);
  const you = useRef(null);

  // Multiplayer touch: the visitor's own pointer gets a "You" tag on the board.
  useEffect(() => {
    const area = board.current;
    const tag = you.current;
    if (!area || !tag || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const step = () => {
      pos.x += (target.x - pos.x) * (still ? 1 : 0.3);
      pos.y += (target.y - pos.y) * (still ? 1 : 0.3);
      tag.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      frame = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.3 ? requestAnimationFrame(step) : 0;
    };
    const move = event => {
      const box = area.getBoundingClientRect();
      target.x = event.clientX - box.left + 14;
      target.y = event.clientY - box.top + 18;
      if (!tag.classList.contains('is-on')) { pos.x = target.x; pos.y = target.y; tag.classList.add('is-on'); }
      if (!frame) frame = requestAnimationFrame(step);
    };
    const leave = () => tag.classList.remove('is-on');
    area.addEventListener('pointermove', move);
    area.addEventListener('pointerleave', leave);
    return () => { area.removeEventListener('pointermove', move); area.removeEventListener('pointerleave', leave); cancelAnimationFrame(frame); };
  }, []);

  return <section className="work-board" id="work" aria-labelledby="work-board-title">
    <div className="board-section" ref={board}>
      <span className="section-tab">⁕ Selected work</span>

      <header className="board-head">
        <h2 id="work-board-title">Two projects, <em>up close.</em></h2>
        <p>Both are for WebToNative, a no-code platform that turns websites into Android and iOS apps. Click through each flow, open the comments, or jump into the full write-up.</p>
      </header>

      {work.map((project, i) => <ProjectBoard key={project.id} project={project} flipped={i % 2 === 1} khushi={i === 0} />)}

      <div className="board-empty">
        <div className="frame-name"><span aria-hidden="true">#</span> 03 — Untitled</div>
        <div className="empty-frame">[Case study 03]<small>still being written up</small></div>
        <div className="frame-name"><span aria-hidden="true">#</span> 04 — Untitled</div>
        <div className="empty-frame">[Case study 04]<small>still being written up</small></div>
      </div>

      <span ref={you} className="you-cursor" aria-hidden="true">You</span>
    </div>
  </section>;
}
