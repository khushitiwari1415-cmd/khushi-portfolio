import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import hostSheet from './assets/sunset-host.png';
import guestSheet from './assets/sunset-guest.png';
import petSheet from './assets/sunset-pets.png';

export const SunsetCompany = forwardRef(function SunsetCompany({sceneRef,busy,onStatus},ref){
 const modal=useRef(null),opener=useRef(null),timers=useRef([]);
 const [visitor,setVisitor]=useState(null),[phase,setPhase]=useState('empty'),[visitorName,setVisitorName]=useState(''),[pet,setPet]=useState('none'),[wave,setWave]=useState(false),[error,setError]=useState('');
 const clear=()=>{timers.current.forEach(clearTimeout);timers.current=[];};
 useEffect(()=>()=>{clear();document.body.style.overflow='';},[]);
 const greet=()=>{setWave(true);timers.current.push(setTimeout(()=>setWave(false),3200));};
 const close=()=>{modal.current.close();opener.current?.focus();};
 const open=event=>{if(busy||phase==='walking'||phase==='settling')return;opener.current=event?.currentTarget;setError('');modal.current.showModal();document.body.style.overflow='hidden';modal.current.querySelector('input[name=visitorName]')?.focus();};
 useImperativeHandle(ref,()=>({open}),[busy,phase]);
 const join=event=>{
  event.preventDefault();if(visitorName.trim().length<2){setError('What should I call you? Please use at least 2 characters.');return;}
  clear();modal.current.close();setVisitor({name:visitorName.trim(),pet});greet();
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  sceneRef.current?.scrollIntoView({block:'center',behavior:'instant'});
  if(reduced){setPhase('seated');onStatus(`${visitorName.trim()} has joined the sunset${pet==='none'?'':` with a ${pet}`}.`);return;}
  setPhase('walking');onStatus(`${visitorName.trim()} is walking over${pet==='none'?'':` with a ${pet}`}. Khushi waves hello.`);
  timers.current.push(setTimeout(()=>setPhase('settling'),4600));
  timers.current.push(setTimeout(()=>{setPhase('seated');onStatus(`${visitorName.trim()} has taken a seat. Stay a little while.`);},5200));
 };
 const leave=()=>{clear();setVisitor(null);setPhase('empty');setVisitorName('');setPet('none');close();onStatus('There’s a quiet spot beside me whenever you like.');};
 const keys=event=>{if(event.key!=='Tab')return;const items=[...modal.current.querySelectorAll('button,input')].filter(x=>!x.disabled&&x.getClientRects().length);if(event.shiftKey&&document.activeElement===items[0]){event.preventDefault();items.at(-1)?.focus();}else if(!event.shiftKey&&document.activeElement===items.at(-1)){event.preventDefault();items[0]?.focus();}};
 return <>
  <button className={'sunset-host'+(wave?' host-waving':'')} style={{backgroundImage:`url(${hostSheet})`}} onClick={()=>{greet();onStatus('Khushi looks up from her notebook and waves hello.');}} aria-label="Wave hello to Khushi" disabled={busy}/>
  {visitor&&<div className={'sunset-visitor visitor-'+phase} role="img" aria-label={`${visitor.name} ${phase==='seated'?'sitting beside Khushi':'arriving to join Khushi'}${visitor.pet==='none'?'':` with a ${visitor.pet}`}`}>
    <div className="visitor-sprite" style={{backgroundImage:`url(${guestSheet})`}}/>
    <span className="visitor-name">{visitor.name}</span>
  </div>}
  {visitor&&visitor.pet!=='none'&&<div aria-hidden="true" className={'sunset-pet pet-'+visitor.pet+' pet-'+phase}><div style={{backgroundImage:`url(${petSheet})`}}/></div>}
  <button className="sit-hotspot" onClick={open} disabled={busy||phase==='walking'||phase==='settling'} aria-label={visitor?'Change your sunset visit':'Sit beside Khushi'}><span>{visitor?'Your quiet corner':'There’s a spot for you'}</span></button>
  <dialog className="letter-dialog join-dialog" ref={modal} aria-labelledby="join-title" onKeyDown={keys} onClose={()=>{document.body.style.overflow='';}} onCancel={e=>{e.preventDefault();close();}} onClick={e=>{if(e.target===e.currentTarget)close();}}>
   <button className="letter-close" onClick={close} aria-label="Close join dialog">Close</button>
   <form onSubmit={join}><span className="eyebrow">A LITTLE COMPANY FOR THE EVENING</span><h3 id="join-title">{visitor?'Your sunset spot.':'There’s room beside me.'}</h3><p className="letter-dialog-intro">Come for a moment. Bring a companion, if you like.</p>
    <label>Your name<input name="visitorName" required minLength={2} maxLength={24} autoComplete="given-name" value={visitorName} onChange={e=>setVisitorName(e.target.value)} placeholder="What should I call you?"/></label>
    <fieldset className="join-pets"><legend>A little companion?</legend><div>{[['none','Just me'],['cat','A cat'],['dog','A dog']].map(([id,label])=><label key={id}><input type="radio" name="companion" checked={pet===id} onChange={()=>setPet(id)}/>{id!=='none'&&<span className={'pet-choice-image choice-'+id} style={{backgroundImage:`url(${petSheet})`}} aria-hidden="true"/>}<span>{label}</span></label>)}</div></fieldset>
    <p className="letter-form-error" role="alert">{error}</p><button className="letter-primary letter-full" type="submit">{visitor?'Join the sunset again':'Save me a spot'}</button>
    <p className="letter-privacy">Your character is part of this visit only. Your name isn’t published or stored.</p>{visitor&&<button className="letter-another join-leave" type="button" onClick={leave}>Leave my spot</button>}
   </form>
  </dialog>
 </>;
});
