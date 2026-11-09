import { useEffect, useRef, useState } from 'react';
import sunsetScene from './assets/letters-sunset.png';
import envelopeSprite from './assets/letter-envelope.png';
import './letter-footer.css';

const recipient = 'khushitiwari1415@gmail.com';
const stamps = [ {id:'lavender',name:'Lavender',caption:'A little wonder'}, {id:'apricot',name:'Apricot',caption:'A warm hello'}, {id:'sage',name:'Sage',caption:'Something thoughtful'} ];

export function LetterFooter() {
  const dialog = useRef(null);
  const trigger = useRef(null);
  const opener = useRef(null);
  const scene = useRef(null);
  const timer = useRef(null);
  const [step,setStep] = useState('write');
  const [name,setName] = useState('');
  const [reply,setReply] = useState('');
  const [message,setMessage] = useState('');
  const [stamp,setStamp] = useState('lavender');
  const [flying,setFlying] = useState(false);
  const [arrived,setArrived] = useState(false);
  const [feedback,setFeedback] = useState('');
  const [emailOpened,setEmailOpened] = useState(false);
  const [error,setError] = useState('');
  useEffect(()=>()=>{clearTimeout(timer.current);document.body.style.overflow='';},[]);
  useEffect(()=>{if(dialog.current?.open){dialog.current.querySelector(step==='write'?'input[name=name]':'h3')?.focus();dialog.current.scrollTop=0;}},[step]);
  const openLetter = event => { if(flying)return;opener.current=event?.currentTarget||trigger.current;setFeedback('');document.body.style.overflow='hidden';dialog.current.showModal();dialog.current.querySelector(step==='write'?'input[name=name]':'h3')?.focus(); };
  const closeLetter = () => {dialog.current.close();opener.current?.focus();};
  const body = `Dear Khushi,\n\n${message.trim()}\n\nFrom,\n${name.trim()}${reply.trim()?`\nReply to: ${reply.trim()}`:''}`;
  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(`A letter after sunset — from ${name.trim()}`)}&body=${encodeURIComponent(body)}`;
  const seal = () => {
    dialog.current.close();setFlying(true);setFeedback('');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    scene.current?.scrollIntoView({block:'center',behavior:reduced?'instant':'smooth'});
    timer.current=setTimeout(()=>{setFlying(false);setArrived(true);setStep('handoff');document.body.style.overflow='hidden';dialog.current.showModal();},reduced?0:1800);
  };
  const containFocus = event => {
    if(event.key!=='Tab')return;
    const items=[...dialog.current.querySelectorAll('button, a[href], input, textarea, select')].filter(node=>!node.disabled && node.getClientRects().length>0);
    const first=items[0], last=items[items.length-1];
    if(event.shiftKey && document.activeElement===first){event.preventDefault();last?.focus();}
    else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first?.focus();}
  };
  const copy = async () => {try{await navigator.clipboard.writeText(body);setFeedback('Letter copied. Paste it into your email when you’re ready.');}catch{setFeedback('Copy isn’t available here. You can download your letter instead.');}};
  const download = () => {const url=URL.createObjectURL(new Blob([body],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='a-letter-for-khushi.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);setFeedback('Your letter is saved as a text file.');};
  const reset = () => {setStep('write');setName('');setReply('');setMessage('');setStamp('lavender');setFeedback('');setEmailOpened(false);setArrived(false);setError('');};
  return <footer className="letter-footer" id="letters" aria-labelledby="letters-title">
    <div className="letter-intro"><div><span className="eyebrow">A SMALL PAUSE BEFORE YOU GO</span><h2 id="letters-title">Stay for the sunset.<br/>Leave a little <em>letter.</em></h2></div><div className="letter-invitation"><p>A thought, a hello, a tiny what-if.<br/>There’s room for it here.</p><button className="letter-primary" ref={trigger} onClick={openLetter} disabled={flying}>{flying?'On its way to the postbox…':arrived?'Your letter is ready':'Write me a letter'}</button><span className="letter-private">A private email to Khushi.</span></div></div>
    <div ref={scene} className={'sunset-scene'+(flying?' letter-in-flight':'')}>
      <img className="sunset-landscape" src={sunsetScene} alt="An illustrated lakeside sunset in peach and lavender, with a designer watching the water and a little postbox among the flowers." loading="lazy"/>
      <span className="scene-caption">Letters after sunset</span>
      <button className="postbox-hotspot" onClick={openLetter} disabled={flying} aria-label={arrived?'Open your prepared letter':'Write a private letter at the postbox'}><span>{arrived?'A letter is waiting':'The postbox is open'}</span></button>
      <img className={'flying-envelope'+(flying?' envelope-travelling':'')+(arrived?' envelope-arrived':'')} src={envelopeSprite} alt="" aria-hidden="true"/>
      <div className="sunset-status" role="status">{flying?'Folding a little thought into the evening…':arrived?'Your letter is ready. Finish sending in your email app.':'A quiet corner for a conversation.'}</div>
    </div>
    <div className="letter-colophon"><span>© {new Date().getFullYear()} Khushi Tiwari</span><span>Made with curiosity, and a little care.</span><a href="#main">Back to the beginning</a></div>
    <dialog className={'letter-dialog stamp-'+stamp} ref={dialog} onKeyDown={containFocus} onClose={()=>{document.body.style.overflow="";}} aria-labelledby="letter-dialog-title" onClick={e=>{if(e.target===e.currentTarget)closeLetter();}} onCancel={event=>{event.preventDefault();closeLetter();setFeedback('');}}>
      <button className="letter-close" onClick={closeLetter} aria-label="Close letter">Close</button>
      {step==='write' && <form onSubmit={e=>{e.preventDefault();if(name.trim().length<2 || message.trim().length<10){setError('Please add your name and at least 10 characters for your letter.');return;}setError('');setStep('preview');setFeedback('');dialog.current.scrollTop=0;}}>
        <span className="eyebrow">LETTERS AFTER SUNSET · 01 / 03</span><h3 id="letter-dialog-title" tabIndex={-1}>What’s on your mind?</h3><p className="letter-dialog-intro">A first hello, a design thought, or an idea we could explore.</p>
        <div className="letter-fields"><label>Your name<input autoFocus name="name" autoComplete="name" required minLength={2} maxLength={40} value={name} onChange={e=>setName(e.target.value)} placeholder="What should I call you?"/></label><label>Your email <span>(optional)</span><input type="email" name="email" autoComplete="email" maxLength={100} value={reply} onChange={e=>setReply(e.target.value)} placeholder="If you’d like a reply"/></label></div>
        <label className="letter-message-label">Your letter<textarea name="message" required minLength={10} maxLength={800} rows={5} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Dear Khushi, …" aria-describedby="letter-count"/></label><div className="letter-count" id="letter-count">{message.length} / 800 <span>At least 10 characters</span></div>
        <fieldset className="stamp-picker"><legend>Choose a little mood for your stamp</legend><div>{stamps.map(s=><label key={s.id} className={'stamp-choice stamp-choice-'+s.id}><input type="radio" name="stamp" value={s.id} checked={stamp===s.id} onChange={()=>setStamp(s.id)}/><span>{s.name}<small>{s.caption}</small></span></label>)}</div></fieldset>
        <p className="letter-form-error" role="alert">{error}</p><button className="letter-primary letter-full" type="submit">Preview my letter</button><p className="letter-privacy">Your words stay in this page until you choose to open an email draft. Closing keeps your draft while this page is open.</p>
      </form>}
      {step==='preview' && <div><span className="eyebrow">A LITTLE THOUGHT, READY TO FOLD · 02 / 03</span><h3 id="letter-dialog-title" tabIndex={-1}>Just like a real letter.</h3><div className="letter-paper"><div className="letter-paper-top"><span>To Khushi</span><span className="letter-stamp">{stamps.find(s=>s.id===stamp).caption}</span></div><p className="letter-salutation">Dear Khushi,</p><p className="letter-handwriting">{message.trim()}</p><p className="letter-signature">With a little curiosity,<br/>{name.trim()}</p>{reply&&<small className="letter-reply">Reply to {reply}</small>}</div><div className="letter-review-actions"><button className="letter-secondary" onClick={()=>setStep('write')}>Keep writing</button><button className="letter-primary" onClick={seal}>Fold & seal my letter</button></div><p className="letter-privacy">Next, a little journey to the postbox. Sending happens in your email app.</p></div>}
      {step==='handoff' && <div className="letter-handoff"><img src={envelopeSprite} alt="A sealed cream envelope with a lavender seal"/><span className="eyebrow">ONE LAST LITTLE STEP · 03 / 03</span><h3 id="letter-dialog-title" tabIndex={-1}>From this sunset<br/>to my inbox.</h3><p>{emailOpened?'Finish sending in your email app. Your letter is still here if you need another way.':'Your letter is folded and ready. Open the draft below, then send it from your email app.'}</p><div className="letter-recipient">To <strong>{recipient}</strong></div><a className="letter-primary letter-full" href={mailto} onClick={()=>setEmailOpened(true)}>Open email draft</a><div className="letter-fallbacks"><button onClick={copy}>Copy letter</button><button onClick={download}>Download letter</button><button onClick={()=>setStep('preview')}>Read it again</button></div><p className="letter-feedback" role="status">{feedback||'Opening a draft does not send the email automatically.'}</p><button className="letter-another" onClick={reset}>Start a new letter</button></div>}
    </dialog>
  </footer>;
}






