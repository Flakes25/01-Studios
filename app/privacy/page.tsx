import {S} from '@/lib/data'
export const metadata={title:'Privacy policy'}
export default function P(){return <section className="px-[5vw] py-16"><h1 className="text-7xl">Privacy policy</h1><div className="mt-10 max-w-2xl space-y-4 text-zinc-300">
<p>{S.name} collects the details you enter in the booking form (name, email, phone, event details) only to reply to your inquiry and arrange your session. We do not sell your data.</p>
<p>Inquiries are stored in our database and kept only as long as needed to serve you. You can ask us to see, correct or delete your data at any time by emailing {S.email}, as provided under the Data Privacy Act of 2012.</p>
<p>Site analytics, if enabled, use a privacy-friendly tool that sets no cookies.</p>
<p className="text-sm text-zinc-500">Draft text. Have it reviewed and edit it to match how your studio actually handles data.</p></div></section>}
