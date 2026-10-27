import BookForm from '@/components/BookForm'
export const metadata={title:'Book a session'}
export default function B({searchParams}:{searchParams:{pkg?:string}}){return <section className="px-[5vw] py-16"><h1 className="text-7xl">Book a session</h1><p className="mb-10 mt-4 text-zinc-400">This sends an inquiry, not a confirmed booking. We confirm availability by email or message.</p><BookForm pkg={searchParams.pkg}/></section>}
