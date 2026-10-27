import Link from 'next/link'
import Gallery from '@/components/Gallery'
import {getPhotos} from '@/lib/photos'
const sv=[['Photography','Weddings, debuts, graduations and portraits.'],['Videography','Cinematic highlight films and full event coverage.'],['Event coverage','Corporate events and celebrations, start to finish.'],['Portrait & studio','Studio sessions with lighting and direction.'],['Commercial & product','Brand imagery and product stills.'],['Creative production','Music videos, concepts and campaign films.']]
export default async function Home(){const items=await getPhotos();return <>
 <section className="relative flex min-h-[85vh] flex-col justify-end overflow-hidden px-[5vw] py-16" style={{background:'radial-gradient(ellipse at 70% 30%,#3a3a3d,transparent 55%)'}}>
 {/* Swap this background for a <video autoPlay muted loop playsInline poster="/hero.jpg"> */}
 <span aria-hidden className="pointer-events-none absolute -right-4 top-4 font-serif text-[min(60vw,50vh)] leading-[.8] text-transparent" style={{WebkitTextStroke:'1px #555'}}>01</span>
 <h1 className="relative text-6xl md:text-9xl">Capturing moments.<br/>Creating stories.</h1><p className="relative mt-5 max-w-xl text-lg text-zinc-400">Photography and film for weddings, debuts, portraits and brands across Pampanga and beyond.</p>
 <div className="relative mt-8 flex gap-3"><Link href="/photos" className="btn f">Explore our work</Link><Link href="/book" className="btn">Book a session</Link></div></section>
 <section className="px-[5vw] py-20"><h2 className="text-5xl">Selected work</h2><Gallery items={items} limit={9} filters={false}/><Link href="/photos" className="btn">See all photos</Link></section>
 <section className="px-[5vw] py-20"><h2 className="mb-10 text-5xl">What we shoot</h2><div className="grid gap-px border border-zinc-800 bg-zinc-800 md:grid-cols-3">{sv.map(s=><div key={s[0]} className="bg-[#0c0c0c] p-8"><h3 className="mb-2 text-3xl">{s[0]}</h3><p className="text-zinc-400">{s[1]}</p></div>)}</div></section>
 <section className="px-[5vw] py-20 text-center"><h2 className="text-5xl">Let’s create something beautiful together.</h2><Link href="/book" className="btn f mt-8">Send an inquiry</Link></section></>}
