import './design-notes.css';
import { useRef, useState } from 'react';
import workspaceBackground from './assets/workspace-background.png';
import intentBackground from './assets/intent-background.png';

const notes = [
  { category: 'SYSTEMS THINKING', title: 'I make complex workflows easier to reason about.', image: workspaceBackground,
    body: 'When WebToNative grew from a single-user tool into a team workspace, I defined how organisations, apps, members, and permissions fit together. That gave each screen a clear structure to work within.',
    context: 'See how I structured the workspace', link: '/work/organisation#system' },
  { category: 'COLLABORATION', title: 'I make the details work for the whole team.', image: '/assets/workspace-cover.webp',
    body: 'Working with a product manager on Organisation, I redesigned invitations around where admins started. An invite from an app grants access to that app. An invite from Members lets the admin choose the apps before sending.',
    context: 'See the invitation decisions', link: '/work/organisation#invitations' },
  { category: 'DESIGN JUDGMENT', title: 'I slow people down when the stakes are high.', image: intentBackground,
    body: 'Confirmation and OTP hadn’t stopped accidental deletions. I moved Delete App into a dedicated Danger Zone and gave the confirmation enough context for people to understand what they were about to lose.',
    context: 'See the redesigned confirmation', link: '/work/intent#modal' },
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
    <div className="notes-heading">
      <h2 id="notes-title">What I bring <em>to your team.</em></h2>
      <p>I’m at my best when a workflow is messy and the next step is unclear. I’ll ask the questions that get us to the real problem, then make the trade-offs easy for the team to discuss.</p>
    </div>
    <div className="notes-list">{notes.map((note, index) => <article className={'note-row' + (open === index ? ' note-open' : '')} key={note.category}>
      <button className="note-toggle" id={'note-toggle-' + index} aria-expanded={open === index} aria-controls={'note-content-' + index} onPointerEnter={e => showPreview(e, index)} onPointerMove={e => showPreview(e, index)} onPointerLeave={() => setPreview(null)} onFocus={e => {const box=region.current.getBoundingClientRect();const row=e.currentTarget.getBoundingClientRect();setPreview({index,x:Math.max(0,box.width-420),y:row.top-box.top-35})}} onBlur={() => setPreview(null)} onClick={() => { setOpen(open === index ? null : index); setPreview(null); }}>
        <span className="note-category">{note.category}</span><span className="note-title">{note.title}</span><span className="note-action">{open === index ? 'Close' : 'See example'}</span><span className="note-number">0{index + 1}</span>
      </button>
      <div className="note-content" id={'note-content-' + index} role="region" aria-labelledby={'note-toggle-' + index} hidden={open !== index}><p>{note.body}</p><a href={note.link}>{note.context} <span aria-hidden="true">↗</span></a></div>
    </article>)}</div>
    <div className={'note-image-preview' + (preview !== null ? ' preview-visible' : '')} style={preview ? {left:preview.x,top:preview.y} : undefined} aria-hidden="true">{preview !== null && <img src={notes[preview.index].image} alt=""/>}</div>
  </section>;
}
