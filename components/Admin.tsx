'use client'
import {useCallback,useEffect,useState} from 'react'
import type {User} from '@supabase/supabase-js'
import {sb} from '@/lib/supabase'
import {CATS} from '@/lib/data'
type Ph={id:string;title:string;category:string;url:string;path:string;featured:boolean}
type Inq={id:string;created_at:string;status:string;name:string;email:string;phone:string;service:string;package:string|null;event_date:string;location:string;budget:string|null;notes:string|null}
const I='rounded bg-zinc-900 border border-zinc-800 p-2 text-sm'
export default function Admin(){
 const db=sb()
 const [u,setU]=useState<User|null>(null),[ready,setReady]=useState(false),[tab,setTab]=useState<'photos'|'inquiries'>('photos'),[msg,setMsg]=useState(''),[ph,setPh]=useState<Ph[]>([]),[iq,setIq]=useState<Inq[]>([]),[busy,setBusy]=useState(false)
 const load=useCallback(async()=>{if(!db)return;const a=await db.from('photos').select('*').order('created_at',{ascending:false});const b=await db.from('inquiries').select('*').order('created_at',{ascending:false});if(a.error||b.error)setMsg((a.error||b.error)!.message);setPh((a.data as Ph[])||[]);setIq((b.data as Inq[])||[])},[db])
 useEffect(()=>{if(!db){setReady(true);return}db.auth.getSession().then(({data})=>{setU(data.session?.user??null);setReady(true)});const{data:s}=db.auth.onAuthStateChange((_e,ss)=>setU(ss?.user??null));return()=>s.subscription.unsubscribe()},[db])
 useEffect(()=>{if(u)load()},[u,load])
 if(!db)return <p className="p-10 text-zinc-400">Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, then restart the dev server.</p>
 if(!ready)return <p className="p-10">Loading…</p>
 if(!u)return <form onSubmit={async e=>{e.preventDefault();const f=new FormData(e.currentTarget);const r=await db.auth.signInWithPassword({email:String(f.get('email')),password:String(f.get('password'))});if(r.error)setMsg(r.error.message)}} className="mx-auto grid max-w-sm gap-3 px-6 py-24"><h1 className="text-5xl">Admin</h1><input name="email" type="email" required placeholder="Email" className={I}/><input name="password" type="password" required placeholder="Password" className={I}/><button className="btn f">Sign in</button><p className="text-sm text-red-300">{msg}</p></form>
 async function up(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const f=e.currentTarget;const d=new FormData(f);const file=d.get('file') as File;if(!file?.size)return;setBusy(true);setMsg('')
  const path=`${Date.now()}-${file.name.replace(/[^\w.-]/g,'_')}`
  const s=await db!.storage.from('photos').upload(path,file);if(s.error){setMsg(s.error.message);setBusy(false);return}
  const url=db!.storage.from('photos').getPublicUrl(path).data.publicUrl
  const r=await db!.from('photos').insert({title:String(d.get('title')),category:String(d.get('category')),url,path,featured:d.get('featured')==='on'})
  if(r.error)setMsg(r.error.message);else{f.reset();await load()}setBusy(false)}
 async function del(p:Ph){if(!confirm(`Delete “${p.title}”?`))return;await db!.storage.from('photos').remove([p.path]);const r=await db!.from('photos').delete().eq('id',p.id);if(r.error)setMsg(r.error.message);load()}
 async function upd(id:string,v:Partial<Ph>){const r=await db!.from('photos').update(v).eq('id',id);if(r.error)setMsg(r.error.message);load()}
 async function st(id:string,status:string){const r=await db!.from('inquiries').update({status}).eq('id',id);if(r.error)setMsg(r.error.message);load()}
 return <section className="px-[5vw] py-12"><div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-5xl">Admin</h1><div className="flex gap-2 text-sm">{(['photos','inquiries'] as const).map(t=><button key={t} onClick={()=>setTab(t)} className={`rounded-full border px-4 py-2 ${tab===t?'bg-white text-black':'border-zinc-700'}`}>{t==='photos'?`Photos (${ph.length})`:`Inquiries (${iq.filter(i=>i.status==='new').length} new)`}</button>)}<button onClick={()=>db.auth.signOut()} className="rounded-full border border-zinc-700 px-4 py-2">Sign out</button></div></div>
 {msg&&<p className="mt-4 text-red-300" role="alert">{msg}</p>}
 {tab==='photos'?<>
 <form onSubmit={up} className="my-8 grid gap-3 border border-zinc-800 p-5 md:grid-cols-5"><input name="file" type="file" accept="image/*" required className={I+' md:col-span-2'}/><input name="title" required placeholder="Title (also used as alt text)" className={I}/><select name="category" className={I}>{CATS.map(c=><option key={c}>{c}</option>)}</select><label className="flex items-center gap-2 text-sm"><input name="featured" type="checkbox"/>Show first on homepage</label><button disabled={busy} className="btn f md:col-span-5">{busy?'Uploading…':'Upload photo'}</button><p className="text-xs text-zinc-500 md:col-span-5">Tip: resize photos to about 2000 px wide (under 2 MB) so the site stays fast.</p></form>
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{ph.map(p=><div key={p.id} className="border border-zinc-800"><img src={p.url} alt={p.title} loading="lazy" className="h-48 w-full object-cover"/><div className="space-y-2 p-3 text-sm"><b>{p.title}</b><div className="text-zinc-500">{p.category}{p.featured?' · featured':''}</div><div className="flex flex-wrap gap-2"><button onClick={()=>{const t=prompt('New title',p.title);if(t)upd(p.id,{title:t})}} className="underline">Rename</button><button onClick={()=>upd(p.id,{featured:!p.featured})} className="underline">{p.featured?'Unfeature':'Feature'}</button><button onClick={()=>del(p)} className="text-red-300 underline">Delete</button></div></div></div>)}{!ph.length&&<p className="text-zinc-500">No photos yet. Upload your first one above.</p>}</div></>
 :<div className="mt-8 grid gap-4">{iq.map(i=><div key={i.id} className="border border-zinc-800 p-5 text-sm"><div className="flex flex-wrap items-center justify-between gap-3"><b className="font-serif text-2xl font-normal">{i.name}</b><select value={i.status} onChange={e=>st(i.id,e.target.value)} className={I}>{['new','contacted','confirmed','declined'].map(s=><option key={s}>{s}</option>)}</select></div>
 <p className="mt-2 text-zinc-400">{i.service}{i.package?` · ${i.package}`:''} · {i.event_date} · {i.location}{i.budget?` · budget ₱${i.budget}`:''}</p><p className="text-zinc-400"><a href={`mailto:${i.email}`} className="underline">{i.email}</a> · {i.phone} · received {new Date(i.created_at).toLocaleString('en-PH')}</p>{i.notes&&<p className="mt-2">{i.notes}</p>}</div>)}{!iq.length&&<p className="text-zinc-500">No inquiries yet.</p>}</div>}</section>}
