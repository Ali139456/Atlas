-- Atlas Global Finance CMS schema
-- Run after 001_contact_inquiries.sql

create type public.content_status as enum ('draft', 'published');
create type public.nav_link_type as enum ('page', 'url', 'anchor', 'none', 'dropdown');
create type public.inquiry_status as enum ('new', 'read', 'in_progress', 'resolved', 'archived');

-- ---------------------------------------------------------------------------
-- Admins & sessions
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  display_name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_login_at timestamptz
);

create table if not exists public.admin_sessions (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid not null references public.admins(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  ip_address text,
  user_agent text
);

create index if not exists admin_sessions_admin_id_idx on public.admin_sessions(admin_id);
create index if not exists admin_sessions_expires_at_idx on public.admin_sessions(expires_at);

create table if not exists public.login_attempts (
  id uuid primary key default gen_random_uuid(),
  ip_address text not null,
  username text,
  success boolean not null default false,
  attempted_at timestamptz not null default now()
);

create index if not exists login_attempts_ip_attempted_at_idx
  on public.login_attempts(ip_address, attempted_at desc);

-- ---------------------------------------------------------------------------
-- Global settings (key-value)
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  draft_value jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.admins(id) on delete set null
);

-- ---------------------------------------------------------------------------
-- Navigation
-- ---------------------------------------------------------------------------
create table if not exists public.navigation_items (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.navigation_items(id) on delete cascade,
  label text not null,
  link_type public.nav_link_type not null default 'url',
  page_slug text,
  url text,
  anchor text,
  sort_order integer not null default 0,
  visible boolean not null default true,
  open_in_new_tab boolean not null default false,
  style text,
  mega_menu boolean not null default false,
  status public.content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.admins(id) on delete set null
);

create index if not exists navigation_items_parent_sort_idx
  on public.navigation_items(parent_id, sort_order);

-- ---------------------------------------------------------------------------
-- Pages & sections
-- ---------------------------------------------------------------------------
create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  show_in_nav boolean not null default false,
  is_system boolean not null default false,
  status public.content_status not null default 'published',
  seo_title text,
  seo_description text,
  canonical_url text,
  og_title text,
  og_description text,
  og_image text,
  robots_index boolean not null default true,
  robots_follow boolean not null default true,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.admins(id) on delete set null
);

create table if not exists public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  section_key text not null,
  section_type text not null,
  sort_order integer not null default 0,
  visible boolean not null default true,
  content jsonb not null default '{}'::jsonb,
  draft_content jsonb,
  status public.content_status not null default 'published',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.admins(id) on delete set null,
  unique (page_id, section_key)
);

create index if not exists page_sections_page_sort_idx
  on public.page_sections(page_id, sort_order);

create table if not exists public.section_items (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.page_sections(id) on delete cascade,
  item_key text,
  sort_order integer not null default 0,
  visible boolean not null default true,
  content jsonb not null default '{}'::jsonb,
  draft_content jsonb,
  status public.content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.admins(id) on delete set null
);

create index if not exists section_items_section_sort_idx
  on public.section_items(section_id, sort_order);

-- ---------------------------------------------------------------------------
-- Services
-- ---------------------------------------------------------------------------
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  index_label text not null default '01',
  short_title text not null,
  title text not null,
  icon text not null default 'bookkeeping',
  description text not null default '',
  summary text not null default '',
  overview text not null default '',
  sort_order integer not null default 0,
  featured boolean not null default false,
  visible boolean not null default true,
  status public.content_status not null default 'published',
  seo_title text,
  seo_description text,
  og_image text,
  cta_label text,
  cta_url text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.admins(id) on delete set null
);

create table if not exists public.service_capabilities (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  title text not null,
  description text not null default '',
  sort_order integer not null default 0,
  visible boolean not null default true,
  status public.content_status not null default 'published'
);

create table if not exists public.service_outcomes (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  text text not null,
  sort_order integer not null default 0,
  visible boolean not null default true,
  status public.content_status not null default 'published'
);

-- ---------------------------------------------------------------------------
-- Industries
-- ---------------------------------------------------------------------------
create table if not exists public.industries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  short_title text not null,
  title text not null,
  description text not null default '',
  summary text not null default '',
  card_image text,
  hero_image text,
  dashboard_image text,
  sort_order integer not null default 0,
  featured boolean not null default false,
  visible boolean not null default true,
  status public.content_status not null default 'published',
  seo_title text,
  seo_description text,
  og_image text,
  cta_label text,
  cta_url text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references public.admins(id) on delete set null
);

create table if not exists public.industry_highlights (
  id uuid primary key default gen_random_uuid(),
  industry_id uuid not null references public.industries(id) on delete cascade,
  text text not null,
  sort_order integer not null default 0,
  visible boolean not null default true
);

create table if not exists public.industry_challenges (
  id uuid primary key default gen_random_uuid(),
  industry_id uuid not null references public.industries(id) on delete cascade,
  title text not null,
  description text not null default '',
  sort_order integer not null default 0,
  visible boolean not null default true
);

create table if not exists public.industry_solutions (
  id uuid primary key default gen_random_uuid(),
  industry_id uuid not null references public.industries(id) on delete cascade,
  title text not null,
  description text not null default '',
  sort_order integer not null default 0,
  visible boolean not null default true
);

-- ---------------------------------------------------------------------------
-- Footer & social
-- ---------------------------------------------------------------------------
create table if not exists public.footer_columns (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  sort_order integer not null default 0,
  visible boolean not null default true,
  status public.content_status not null default 'published'
);

create table if not exists public.footer_links (
  id uuid primary key default gen_random_uuid(),
  column_id uuid not null references public.footer_columns(id) on delete cascade,
  label text not null,
  href text not null,
  external boolean not null default false,
  sort_order integer not null default 0,
  visible boolean not null default true,
  status public.content_status not null default 'published'
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  icon text not null default 'linkedin',
  sort_order integer not null default 0,
  visible boolean not null default true,
  status public.content_status not null default 'published'
);

-- ---------------------------------------------------------------------------
-- Form options & CTA blocks
-- ---------------------------------------------------------------------------
create table if not exists public.form_field_options (
  id uuid primary key default gen_random_uuid(),
  field_key text not null,
  label text not null,
  sort_order integer not null default 0,
  visible boolean not null default true,
  status public.content_status not null default 'published'
);

create index if not exists form_field_options_field_sort_idx
  on public.form_field_options(field_key, sort_order);

create table if not exists public.cta_blocks (
  id uuid primary key default gen_random_uuid(),
  block_key text not null unique,
  eyebrow text,
  title text,
  title_accent text,
  description text,
  button_label text,
  button_url text,
  visible boolean not null default true,
  status public.content_status not null default 'published',
  content jsonb not null default '{}'::jsonb,
  draft_content jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.admins(id) on delete set null
);

-- ---------------------------------------------------------------------------
-- Media
-- ---------------------------------------------------------------------------
create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  storage_path text not null unique,
  public_url text not null,
  mime_type text not null,
  size_bytes bigint not null default 0,
  alt_text text,
  title text,
  width integer,
  height integer,
  created_at timestamptz not null default now(),
  created_by uuid references public.admins(id) on delete set null
);

-- ---------------------------------------------------------------------------
-- Extend contact inquiries
-- ---------------------------------------------------------------------------
alter table public.contact_inquiries
  add column if not exists phone text,
  add column if not exists industry text,
  add column if not exists inquiry_type text,
  add column if not exists company_size text,
  add column if not exists status public.inquiry_status not null default 'new';

-- ---------------------------------------------------------------------------
-- Audit log
-- ---------------------------------------------------------------------------
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.admins(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  entity_name text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_logs_created_at_idx on public.audit_logs(created_at desc);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.admins enable row level security;
alter table public.admin_sessions enable row level security;
alter table public.login_attempts enable row level security;
alter table public.site_settings enable row level security;
alter table public.navigation_items enable row level security;
alter table public.pages enable row level security;
alter table public.page_sections enable row level security;
alter table public.section_items enable row level security;
alter table public.services enable row level security;
alter table public.service_capabilities enable row level security;
alter table public.service_outcomes enable row level security;
alter table public.industries enable row level security;
alter table public.industry_highlights enable row level security;
alter table public.industry_challenges enable row level security;
alter table public.industry_solutions enable row level security;
alter table public.footer_columns enable row level security;
alter table public.footer_links enable row level security;
alter table public.social_links enable row level security;
alter table public.form_field_options enable row level security;
alter table public.cta_blocks enable row level security;
alter table public.media enable row level security;
alter table public.audit_logs enable row level security;

-- Public read: published website content only (anon key + server reads)
create policy "public_read_published_navigation"
  on public.navigation_items for select
  using (status = 'published' and visible = true);

create policy "public_read_published_pages"
  on public.pages for select
  using (status = 'published');

create policy "public_read_published_page_sections"
  on public.page_sections for select
  using (status = 'published' and visible = true);

create policy "public_read_published_section_items"
  on public.section_items for select
  using (status = 'published' and visible = true);

create policy "public_read_published_services"
  on public.services for select
  using (status = 'published' and visible = true);

create policy "public_read_published_service_capabilities"
  on public.service_capabilities for select
  using (status = 'published' and visible = true);

create policy "public_read_published_service_outcomes"
  on public.service_outcomes for select
  using (status = 'published' and visible = true);

create policy "public_read_published_industries"
  on public.industries for select
  using (status = 'published' and visible = true);

create policy "public_read_published_industry_highlights"
  on public.industry_highlights for select
  using (visible = true);

create policy "public_read_published_industry_challenges"
  on public.industry_challenges for select
  using (visible = true);

create policy "public_read_published_industry_solutions"
  on public.industry_solutions for select
  using (visible = true);

create policy "public_read_published_footer_columns"
  on public.footer_columns for select
  using (status = 'published' and visible = true);

create policy "public_read_published_footer_links"
  on public.footer_links for select
  using (status = 'published' and visible = true);

create policy "public_read_published_social_links"
  on public.social_links for select
  using (status = 'published' and visible = true);

create policy "public_read_published_form_options"
  on public.form_field_options for select
  using (status = 'published' and visible = true);

create policy "public_read_published_cta_blocks"
  on public.cta_blocks for select
  using (status = 'published' and visible = true);

create policy "public_read_published_site_settings"
  on public.site_settings for select
  using (true);

create policy "public_read_published_media"
  on public.media for select
  using (true);

-- No public policies on admins, sessions, login_attempts, audit_logs
-- All writes go through service role from authenticated server routes
