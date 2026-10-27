import './globals.css'
import Link from 'next/link'
import Script from 'next/script'
import {S} from '@/lib/data'
export const metadata={title:{default:'01 Studios — Photography & Film, Pampanga',template:'%s — 01 Studios'},description:'Photography and videography studio in Pampanga for weddings, debuts, portraits, events and commercial work.',openGraph:{title:'01 Studios',type:'website' as const}}
const N=[['/photos','Photos'],['/films','Films'],['/packages','Packages'],['/about','About'],['/contact','Contact']]
export default function L({children}:{children:React.ReactNode}){return <html lang="en"><body>
 <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-black/85 px-[5vw] py-4 backdrop-blur"><Link href="/" className="font-serif text-3xl">01 Studios</Link>
 <nav className="flex flex-wrap items-center gap-5 text-sm text-zinc-400">{N.map(([h,t])=><Link key={h} href={h} className="hover:text-white">{t}</Link>)}<Link href="/book" className="btn f !px-4 !py-1">Book</Link></nav></header>
 <main>{children}</main>
 {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN&&<Script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" strategy="afterInteractive"/>}
 <footer className="flex flex-wrap justify-between gap-8 border-t border-zinc-800 px-[5vw] py-14 text-sm text-zinc-500"><div><b className="font-serif text-2xl font-normal text-white">01 Studios</b><br/>{S.loc}</div><div><a href={S.fb}>Facebook</a><br/><a href={S.ig}>Instagram</a><br/><a href={`mailto:${S.email}`}>{S.email}</a><br/><Link href="/privacy">Privacy policy</Link></div></footer>
 <Link href="/book" className="btn f fixed bottom-5 right-5 z-30 shadow-2xl">Book a session</Link></body></html>}
