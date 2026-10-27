import {S,FAQ} from '@/lib/data'
export const metadata={title:'Contact'}
export default function C(){return <section className="px-[5vw] py-16"><h1 className="text-7xl">Contact</h1><p className="my-8 text-zinc-300">{S.loc}<br/>{S.hours}<br/><a href={`mailto:${S.email}`}>{S.email}</a><br/>{S.phone}</p>
 {/* GOOGLE MAPS: paste your embed iframe here */}<div className="mb-14 grid h-64 place-items-center bg-zinc-900 text-zinc-500">Google Maps embed goes here</div>
 <h2 className="mb-4 text-4xl">Questions</h2>{FAQ.map(f=><details key={f[0]} className="border-t border-zinc-800 py-4"><summary className="cursor-pointer font-serif text-2xl">{f[0]}</summary><p className="mt-2 text-zinc-400">{f[1]}</p></details>)}</section>}
