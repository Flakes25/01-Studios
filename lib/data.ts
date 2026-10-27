// EDIT HERE: studio details, prices, photos, FAQ
export const S={name:'01 Studios',loc:'Pampanga, Philippines',email:'hello@example.com',phone:'+63 900 000 0000',hours:'Mon–Sat, 9:00 AM–6:00 PM',fb:'https://facebook.com/',ig:'https://instagram.com/'}
export const CATS=['Weddings','Debuts','Portraits','Graduation','Events','Fashion','Commercial','Creative']
// Replace `src` with real image paths in /public/photos (e.g. '/photos/wedding-1.jpg') and write real alt text.
export const PHOTOS=Array.from({length:16},(_,n)=>({id:n,title:`Placeholder ${n+1}`,cat:CATS[n%8],src:'' as string,alt:`Placeholder photo ${n+1}`,h:[300,420,360,480][n%4]}))
// PLACEHOLDER prices (PHP). Replace with confirmed rates.
export const PK=[
{g:'Photography',name:'Photo Basic',price:8000,hrs:4,crew:'1 photographer',photos:100,video:'',days:7,pop:0},
{g:'Photography',name:'Photo Standard',price:15000,hrs:6,crew:'2 photographers',photos:200,video:'',days:10,pop:1},
{g:'Photography',name:'Photo Premium',price:25000,hrs:8,crew:'2 photographers',photos:350,video:'Teaser photo set',days:14,pop:0},
{g:'Videography',name:'Basic Coverage',price:18000,hrs:4,crew:'1 videographer',photos:0,video:'3–5 min film',days:21,pop:0},
{g:'Videography',name:'Cinematic Highlight',price:30000,hrs:6,crew:'2 videographers',photos:0,video:'Highlight film + teaser',days:30,pop:1},
{g:'Videography',name:'Full Event Film',price:45000,hrs:8,crew:'2 videographers',photos:0,video:'Highlight + full-length film',days:45,pop:0},
{g:'Bundles',name:'Essential Bundle',price:28000,hrs:6,crew:'1 + 1 crew',photos:150,video:'Highlight film',days:30,pop:0},
{g:'Bundles',name:'Signature Bundle',price:45000,hrs:8,crew:'2 + 2 crew',photos:300,video:'Highlight + teaser',days:35,pop:1},
{g:'Bundles',name:'Luxury Bundle',price:70000,hrs:10,crew:'3 + 2 crew',photos:500,video:'Full film + teaser + drone',days:45,pop:0}]
export const EXTRAS=['Additional shooting hours','Drone coverage','Same-day edit','Photo album','Prints','Additional photographer or videographer']
export const FAQ=[['How do I book a session?','Send an inquiry through the booking form. We reply to confirm availability.'],['How much is the reservation fee?','Placeholder: set your reservation fee here.'],['How long does editing take?','Photos take 7–14 days, films 3–6 weeks. Each package lists its own turnaround.'],['Can I customize a package?','Yes. Describe what you need in the notes and we will quote it.'],['Do you accept out-of-town bookings?','Yes. Travel costs are quoted per location.'],['When will I receive my files?','Through a private online gallery at the end of the turnaround time.']]
export const peso=(n:number)=>'₱'+n.toLocaleString('en-PH')
