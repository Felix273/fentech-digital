alter table public.contact_submissions
add column if not exists priority text not null default 'medium',
add column if not exists source text not null default 'website',
add column if not exists user_agent text,
add column if not exists updated_at timestamptz not null default now();

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
