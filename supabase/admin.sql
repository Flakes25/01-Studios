-- Run in Supabase > SQL Editor, after schema.sql
create table photos(id uuid primary key default gen_random_uuid(),created_at timestamptz default now(),title text not null,category text not null,url text not null,path text not null,featured boolean default false);
alter table photos enable row level security;
create policy "public read photos" on photos for select using(true);
create policy "admin write photos" on photos for all to authenticated using(true) with check(true);
create policy "admin read inquiries" on inquiries for select to authenticated using(true);
create policy "admin update inquiries" on inquiries for update to authenticated using(true);
insert into storage.buckets(id,name,public) values('photos','photos',true) on conflict do nothing;
create policy "public read files" on storage.objects for select using(bucket_id='photos');
create policy "admin upload files" on storage.objects for insert to authenticated with check(bucket_id='photos');
create policy "admin delete files" on storage.objects for delete to authenticated using(bucket_id='photos');
-- IMPORTANT: Supabase > Authentication > Sign In / Providers: turn OFF "Allow new users to sign up",
-- then add the owner under Authentication > Users > Add user. Anyone who can sign up would get admin access.
