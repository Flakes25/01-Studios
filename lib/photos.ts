import {PHOTOS} from './data'
export type Item={id:string|number;n:number;title:string;cat:string;src:string;alt:string;h:number}
const H=[300,420,360,480]
export async function getPhotos():Promise<Item[]>{
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
 const fb:Item[]=PHOTOS.map(p=>({id:p.id,n:p.id,title:p.title,cat:p.cat,src:p.src,alt:p.alt,h:p.h}))
 if(!url||!key)return fb
 try{const r=await fetch(`${url}/rest/v1/photos?select=*&order=featured.desc,created_at.desc`,{headers:{apikey:key,Authorization:`Bearer ${key}`},next:{revalidate:30}})
  if(!r.ok)return fb;const d=await r.json()
  return d.length?d.map((p:any,i:number)=>({id:p.id,n:i,title:p.title,cat:p.category,src:p.url,alt:p.title,h:H[i%4]})):fb}catch{return fb}}
