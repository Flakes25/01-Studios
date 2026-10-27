'use client'
import {useState} from 'react'
import {PK} from '@/lib/data'
const F='w-full rounded bg-zinc-900 border border-zinc-800 p-3 focus:border-white outline-none'
export default function BookForm({pkg=''}:{pkg?:string}){
 const [m,setM]=useState<{ok:boolean;t:string}|null>(null);const [e,setE]=useState<Record<string,string>>({});const [busy,setBusy]=useState(false)
 async function go(ev:React.FormEvent<HTMLFormElement>){ev.preventDefault();const f=ev.currentTarget;const d=Object.fromEntries(new FormData(f)) as Record<string,string>;const er:Record<string,string>={}
  for(const k of ['name','email','phone','service','date','location'])if(!d[k]?.trim())er[k]='This field is required.'
  if(d.email&&!/^\S+@\S+\.\S+$/.test(d.email))er.email='Enter a valid email address.'
  setE(er);if(Object.keys(er).length){setM({ok:false,t:'Please fix the highlighted fields.'});return}
  setBusy(true);try{const r=await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});if(!r.ok)throw 0;setM({ok:true,t:'Inquiry received. This is not a confirmed booking. We will reply to confirm availability.'});f.reset()}catch{setM({ok:false,t:'We couldn’t send that. Please email us instead.'})}setBusy(false)}
 const L=(k:string,l:string,x:React.ReactNode)=><label className="grid gap-1 text-sm text-zinc-400">{l}{x}<span className="min-h-4 text-xs text-red-300">{e[k]}</span></label>
 return <form onSubmit={go} noValidate className="grid max-w-xl gap-3">
 <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]"/>
 {L('name','Full name',<input name="name" className={F} autoComplete="name"/>)}
 {L('email','Email',<input name="email" type="email" className={F} autoComplete="email"/>)}
 {L('phone','Phone',<input name="phone" type="tel" className={F} autoComplete="tel"/>)}
 {L('service','Service',<select name="service" className={F}><option value="">Choose one</option>{['Photography','Videography','Photo + video','Event coverage','Portrait or studio','Commercial or product'].map(o=><option key={o}>{o}</option>)}</select>)}
 {L('pkg','Package',<select name="pkg" defaultValue={pkg} className={F}><option value="">Not sure yet</option>{PK.map(p=><option key={p.name}>{p.name}</option>)}</select>)}
 {L('date','Preferred date',<input name="date" type="date" className={F}/>)}
 {L('location','Event location',<input name="location" className={F}/>)}
 {L('budget','Estimated budget (optional)',<input name="budget" inputMode="numeric" placeholder="₱" className={F}/>)}
 {L('notes','Notes',<textarea name="notes" rows={4} className={F}/>)}
 <button disabled={busy} className="btn f">{busy?'Sending…':'Send inquiry'}</button>
 {m&&<p role="status" className={m.ok?'text-green-400':'text-red-300'}>{m.t}</p>}</form>}
