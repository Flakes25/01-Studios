'use client'
import {useState,useEffect} from 'react'
import {CATS} from '@/lib/data'
import type {Item} from '@/lib/photos'
function Img({p,h}:{p:Item;h:number}){return p.src?<img src={p.src} alt={p.alt} loading="lazy" className="w-full object-cover" style={{height:h}}/>:<div role="img" aria-label={p.alt} className="w-full" style={{height:h,background:`linear-gradient(${p.n*37}deg,hsl(${p.n*47%360} 8% 22%),hsl(${(p.n*47+140)%360} 10% 9%))`}}/>}
export default function Gallery({items,limit,filters=true}:{items:Item[];limit?:number;filters?:boolean}){
 const [c,setC]=useState('');const [o,setO]=useState<number|null>(null)
 const list=items.filter(p=>!c||p.cat===c).slice(0,limit)
 useEffect(()=>{if(o===null)return;const n=list.length;const k=(e:KeyboardEvent)=>{if(e.key==='Escape')setO(null);if(e.key==='ArrowRight')setO(i=>((i??0)+1)%n);if(e.key==='ArrowLeft')setO(i=>((i??0)-1+n)%n)};addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[o,list.length])
 return <>
 {filters&&<div className="my-6 flex flex-wrap gap-2">{['',...CATS].map(x=><button key={x} onClick={()=>setC(x)} className={`rounded-full border px-4 py-2 text-sm ${c===x?'bg-white text-black':'border-zinc-700 text-zinc-400 hover:text-white'}`}>{x||'All'}</button>)}</div>}
 <div className="my-8 columns-1 gap-4 sm:columns-2 lg:columns-3">{list.map((p,i)=><button key={p.id} onClick={()=>setO(i)} aria-label={`Open ${p.title}`} className="group relative mb-4 block w-full overflow-hidden text-left"><Img p={p} h={p.h}/><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 p-4 pt-10 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100"><b className="block font-serif text-xl font-normal">{p.title}</b>{p.cat}</span></button>)}</div>
 {o!==null&&list[o]&&<div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/95 p-6"><button onClick={()=>setO(null)} aria-label="Close" className="absolute right-5 top-5 h-12 w-12 rounded-full border border-zinc-700">✕</button><button onClick={()=>setO((o+list.length-1)%list.length)} aria-label="Previous" className="absolute left-4 h-12 w-12 rounded-full border border-zinc-700">‹</button><button onClick={()=>setO((o+1)%list.length)} aria-label="Next" className="absolute right-4 h-12 w-12 rounded-full border border-zinc-700">›</button><div className="w-full max-w-4xl text-center"><Img p={list[o]} h={520}/><h3 className="mt-4 text-3xl">{list[o].title}</h3></div></div>}
 </>}
