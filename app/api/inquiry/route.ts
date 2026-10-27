import {NextResponse} from 'next/server'
export async function POST(req:Request){
 const d=await req.json().catch(()=>null)
 if(!d||d.website)return NextResponse.json({ok:true}) // honeypot: bots get a fake success
 for(const k of ['name','email','phone','service','date','location'])if(!String(d[k]||'').trim())return NextResponse.json({error:k},{status:400})
 if(!/^\S+@\S+\.\S+$/.test(d.email))return NextResponse.json({error:'email'},{status:400})
 const row={name:d.name,email:d.email,phone:d.phone,service:d.service,package:d.pkg||null,event_date:d.date,location:d.location,budget:d.budget||null,notes:d.notes||null}
 const url=process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_KEY
 if(!url||!key){console.log('INQUIRY (no Supabase configured):',row);return NextResponse.json({ok:true})}
 const r=await fetch(`${url}/rest/v1/inquiries`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify(row)})
 if(r.ok&&process.env.RESEND_API_KEY&&process.env.NOTIFY_EMAIL)await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:'01 Studios <onboarding@resend.dev>',to:process.env.NOTIFY_EMAIL,subject:`New inquiry: ${row.name}`,text:Object.entries(row).map(([k,v])=>k+': '+v).join('\n')})}).catch(()=>{})
 return r.ok?NextResponse.json({ok:true}):NextResponse.json({error:'db'},{status:500})}
