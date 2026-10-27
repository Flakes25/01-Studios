import Gallery from '@/components/Gallery'
import {getPhotos} from '@/lib/photos'
export const metadata={title:'Photos'}
export default async function P(){return <section className="px-[5vw] py-16"><h1 className="text-7xl">Photos</h1><Gallery items={await getPhotos()}/></section>}
