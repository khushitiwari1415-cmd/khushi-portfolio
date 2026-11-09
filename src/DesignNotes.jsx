import { useRef, useState } from 'react';
import workspaceBackground from './assets/workspace-background.png';
import intentBackground from './assets/intent-background.png';

const notes = [
  { category: 'CLARITY', title: 'Making complex things feel simple.', image: workspaceBackground,
    body: 'I turn human needs into clear, intuitive experiences. For me, clarity means helping people understand where they are, what they can do, and what comes next.',
    context: 'In the work: a unified workspace for WebToNative.', link: 'https://rocky-squid-b1f.notion.site/Organisation-32c71ab9856881368320e690e2cfc4b3' },
  { category: 'COLLABORATION', title: 'Designing the space between people.', image: '/assets/workspace-cover.webp',
    body: 'A tool changes when people start using it together. The Organisation project explores that shift: bringing apps and team members into one shared workspace, with collaboration at its centre.',
    context: 'Explore the Organisation case study.', link: 'https://rocky-squid-b1f.notion.site/Organisation-32c71ab9856881368320e690e2cfc4b3' },
  { category: 'INTENT', title: 'A little friction, where it matters.', image: intentBackground,
    body: 'Some actions deserve a moment of thought. In a critical deletion flow, intentional friction and thoughtful action placement can help people pause and understand a decision before they make it.',
    context: 'Explore Designing for Intent, Not Error.', link: 'https://rocky-squid-b1f.notion.site/Designing-for-Intent-Not-Error-32f71ab985688055bd7cece936d4609a' },
  { category: 'CURIOSITY', title: 'Starting with the why.', image: workspaceBackground,
    body: 'I’m driven by the why behind every interaction. Beyond pixels and prototypes, I keep exploring, sketching, and getting lost in music. That curiosity is part of how I look at the world—and how I approach design.',
    context: 'More about me on my Notion portfolio.', link: 'https://rocky-squid-b1f.notion.site/khushi-tiwari' },
];

export function DesignNotes() {
  const [open, setOpen] = useState(null);
  const [preview, setPreview] = useState(null);
  const region = useRef(null);
  const showPreview = (event, index) => {
    if (event.pointerType === 'touch') return;
    const box = region.current.getBoundingClientRect();
    const width = 260;
    setPreview({ index, x: Math.max(0, Math.min(box.width - width - 20, event.clientX - box.left + 30)), y: event.clientY - box.top - 80 });
  };
  return <section className="design-notes" id="behind-the-pixels" aria-labelledby="notes-title" ref={region} onPointerLeave={() => setPreview(null)}>
    <div className="notes-heading"><div><span className="eyebrow">THE THINKING BEHIND THE WORK</span><h2 id="notes-title">Behind the <em>pixels.</em></h2></div><p>A few principles that shape<br/>how I think, question, and design.</p></div>
    <div className="notes-list">{notes.map((note, index) => <article className={'note-row' + (open === index ? ' note-open' : '')} key={note.category}>
      <button className="note-toggle" id={'note-toggle-' + index} aria-expanded={open === index} aria-controls={'note-content-' + index} onPointerEnter={e => showPreview(e, index)} onPointerMove={e => showPreview(e, index)} onPointerLeave={() => setPreview(null)} onFocus={e => {const box=region.current.getBoundingClientRect();const row=e.currentTarget.getBoundingClientRect();setPreview({index,x:Math.max(0,box.width-420),y:row.top-box.top-35})}} onBlur={() => setPreview(null)} onClick={() => { setOpen(open === index ? null : index); setPreview(null); }}>
        <span className="note-category">{note.category}</span><span className="note-title">{note.title}</span><span className="note-action">{open === index ? 'Close note' : 'Read note'}</span><span className="note-number">0{index + 1}</span>
      </button>
      <div className="note-content" id={'note-content-' + index} role="region" aria-labelledby={'note-toggle-' + index} hidden={open !== index}><p>{note.body}</p><a href={note.link} target="_blank" rel="noreferrer">{note.context}<span className="sr-only"> (opens in a new tab)</span></a></div>
    </article>)}</div>
    <div className={'note-image-preview' + (preview !== null ? ' preview-visible' : '')} style={preview ? {left:preview.x,top:preview.y} : undefined} aria-hidden="true">{preview !== null && <img src={notes[preview.index].image} alt=""/>}</div>
  </section>;
}



