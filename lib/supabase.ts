import {createClient,SupabaseClient} from '@supabase/supabase-js'
let c:SupabaseClient|null=null
export const sb=()=>{const u=process.env.NEXT_PUBLIC_SUPABASE_URL,k=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;if(!u||!k)return null;return c??(c=createClient(u,k))}
