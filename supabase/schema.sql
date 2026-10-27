create table inquiries(id uuid primary key default gen_random_uuid(),created_at timestamptz default now(),status text default 'new',
 name text,email text,phone text,service text,package text,event_date date,location text,budget text,notes text);
alter table inquiries enable row level security; -- no public policies: only the server (service key) writes; read in the Supabase dashboard.
