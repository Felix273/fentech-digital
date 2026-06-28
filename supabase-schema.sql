create extension if not exists pgcrypto;

create table if not exists public.site_content (
  id text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  new.updated_by = auth.uid();
  return new;
end;
$$;

drop trigger if exists trg_site_content_updated_at on public.site_content;
create trigger trg_site_content_updated_at
before insert or update on public.site_content
for each row execute function public.set_site_content_updated_at();

alter table public.site_content enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content for select
using (true);

drop policy if exists "Authenticated admins can manage site content" on public.site_content;
create policy "Authenticated admins can manage site content"
on public.site_content for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  company text,
  phone text,
  service_required text not null,
  priority text not null default 'medium',
  message text not null,
  status text not null default 'new',
  source text not null default 'website',
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_contact_submissions_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_contact_submissions_updated_at on public.contact_submissions;
create trigger trg_contact_submissions_updated_at
before update on public.contact_submissions
for each row execute function public.set_contact_submissions_updated_at();

alter table public.contact_submissions enable row level security;

drop policy if exists "Authenticated admins can read submissions" on public.contact_submissions;
create policy "Authenticated admins can read submissions"
on public.contact_submissions for select
using (auth.role() = 'authenticated');

drop policy if exists "Authenticated admins can update submissions" on public.contact_submissions;
create policy "Authenticated admins can update submissions"
on public.contact_submissions for update
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists "Public can create contact submissions" on public.contact_submissions;
create policy "Public can create contact submissions"
on public.contact_submissions for insert
with check (true);

insert into public.site_content (id, content) values
('site_settings','{"email":"fentechgroup@gmail.com","phone":"+254 114 295 869","whatsapp":"https://wa.me/254114295869","location":"Nairobi, Kenya","footerBrandLine":"Software, cloud, cybersecurity and automation for ambitious Kenyan businesses.","footerTagline":"Growth, engineered for Kenya."}'::jsonb),
('homepage','{"heroKicker":"Nairobi · Software · Cloud · AI","heroTitle":"Growth,\nengineered\nfor Kenya.","heroBody":"We design and build software, websites, cloud systems and automation that help Kenyan businesses turn ambition into visible, measurable progress.","introLabel":"What we do","introTitle":"Technology that moves real operations.","introLead":"FenTech helps companies replace manual processes, fragile websites and disconnected tools with reliable digital systems built for how Kenyan teams work.","servicesLabel":"Capabilities","servicesTitle":"Software, cloud and security under one roof.","workLabel":"Selected work","workTitle":"Practical systems for practical growth.","industriesLabel":"Markets we understand","industriesTitle":"Built for Kenya’s daily business realities.","partnersLabel":"Technology focus","ctaTitle":"Ready to build something useful?","ctaBody":"Tell us what you want to launch, fix or automate."}'::jsonb),
('about','{"heroLabel":"About FenTech","heroTitle":"A Kenyan technology partner for serious digital growth.","heroLead":"We combine product thinking, software engineering, cloud infrastructure and security discipline to help businesses build systems that last.","storyLabel":"Our story","storyTitle":"We build technology around the work, not the other way around.","storyLead":"FenTech Digital exists for organizations that need practical, secure and scalable technology without enterprise complexity.","storyBody":"From SMEs and SACCOs to clinics, logistics teams and service businesses, we help teams turn manual workflows into clear digital products, dashboards and automations.","storyImage":"/editorial/it-software-team.webp","storyImageAlt":"Software team reviewing cloud architecture and product dashboards"}'::jsonb),
('services','{"heroLabel":"Services","heroTitle":"Digital capability built end to end.","heroLead":"From strategy to launch, we design, build, secure and support the systems Kenyan businesses depend on."}'::jsonb),
('work','{"heroLabel":"Work","heroTitle":"Proof-of-work for Kenyan business problems.","heroLead":"A portfolio of commerce platforms, portals, booking systems and operations dashboards designed for real market constraints."}'::jsonb),
('contact','{"heroLabel":"Contact FenTech","heroTitle":"Let’s make your next system move.","heroLead":"Tell us what you are building, fixing or automating. We will help turn the challenge into a clear digital plan."}'::jsonb),
('services_collection','[]'::jsonb),
('case_studies','[]'::jsonb),
('testimonials','[]'::jsonb),
('industries','[]'::jsonb)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('site-media','site-media',true)
on conflict (id) do nothing;

drop policy if exists "Public can read site media" on storage.objects;
create policy "Public can read site media"
on storage.objects for select
using (bucket_id = 'site-media');

drop policy if exists "Authenticated admins can upload site media" on storage.objects;
create policy "Authenticated admins can upload site media"
on storage.objects for insert
with check (bucket_id = 'site-media' and auth.role() = 'authenticated');

drop policy if exists "Authenticated admins can update site media" on storage.objects;
create policy "Authenticated admins can update site media"
on storage.objects for update
using (bucket_id = 'site-media' and auth.role() = 'authenticated')
with check (bucket_id = 'site-media' and auth.role() = 'authenticated');

drop policy if exists "Authenticated admins can delete site media" on storage.objects;
create policy "Authenticated admins can delete site media"
on storage.objects for delete
using (bucket_id = 'site-media' and auth.role() = 'authenticated');
