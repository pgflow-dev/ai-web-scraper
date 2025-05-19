create table public.websites (
  id           bigserial primary key,
  website_url  text not null,
  summary      text,
  tags         text[],
  created_at   timestamptz default now()
);
