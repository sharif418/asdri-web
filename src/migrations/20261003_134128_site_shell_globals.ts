import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_social_platform" AS ENUM('facebook', 'youtube', 'whatsapp', 'telegram', 'instagram', 'x', 'linkedin');
  CREATE TYPE "public"."enum_navigation_primary_children_feature" AS ENUM('admissions', 'donations', 'zakatCalculator', 'blog', 'notices', 'gallery', 'downloads', 'faq', 'fatwa', 'clarifications', 'library', 'books', 'researchProjects', 'videos', 'news', 'events', 'sponsorship', 'donorPortal', 'studentPortal', 'alumniPortal', 'search', 'accounts');
  CREATE TYPE "public"."enum_navigation_primary_feature" AS ENUM('admissions', 'donations', 'zakatCalculator', 'blog', 'notices', 'gallery', 'downloads', 'faq', 'fatwa', 'clarifications', 'library', 'books', 'researchProjects', 'videos', 'news', 'events', 'sponsorship', 'donorPortal', 'studentPortal', 'alumniPortal', 'search', 'accounts');
  CREATE TYPE "public"."enum_navigation_utility_feature" AS ENUM('admissions', 'donations', 'zakatCalculator', 'blog', 'notices', 'gallery', 'downloads', 'faq', 'fatwa', 'clarifications', 'library', 'books', 'researchProjects', 'videos', 'news', 'events', 'sponsorship', 'donorPortal', 'studentPortal', 'alumniPortal', 'search', 'accounts');
  CREATE TYPE "public"."enum_navigation_footer_columns_links_feature" AS ENUM('admissions', 'donations', 'zakatCalculator', 'blog', 'notices', 'gallery', 'downloads', 'faq', 'fatwa', 'clarifications', 'library', 'books', 'researchProjects', 'videos', 'news', 'events', 'sponsorship', 'donorPortal', 'studentPortal', 'alumniPortal', 'search', 'accounts');
  CREATE TYPE "public"."enum_navigation_legal_feature" AS ENUM('admissions', 'donations', 'zakatCalculator', 'blog', 'notices', 'gallery', 'downloads', 'faq', 'fatwa', 'clarifications', 'library', 'books', 'researchProjects', 'videos', 'news', 'events', 'sponsorship', 'donorPortal', 'studentPortal', 'alumniPortal', 'search', 'accounts');
  CREATE TABLE "site_settings_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_phones_locales" (
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_addresses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"map_url" varchar
  );
  
  CREATE TABLE "site_settings_addresses_locales" (
  	"label" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_other_websites" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_other_websites_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_url" varchar DEFAULT 'https://assunnahfoundation.org/',
  	"logo_id" integer,
  	"prospectus_id" integer,
  	"email" varchar,
  	"admission_qr_id" integer,
  	"features_admissions" boolean DEFAULT true,
  	"features_donations" boolean DEFAULT true,
  	"features_zakat_calculator" boolean DEFAULT true,
  	"features_blog" boolean DEFAULT true,
  	"features_notices" boolean DEFAULT true,
  	"features_gallery" boolean DEFAULT true,
  	"features_downloads" boolean DEFAULT true,
  	"features_faq" boolean DEFAULT true,
  	"features_fatwa" boolean DEFAULT false,
  	"features_clarifications" boolean DEFAULT false,
  	"features_library" boolean DEFAULT false,
  	"features_books" boolean DEFAULT false,
  	"features_research_projects" boolean DEFAULT false,
  	"features_videos" boolean DEFAULT false,
  	"features_news" boolean DEFAULT false,
  	"features_events" boolean DEFAULT false,
  	"features_comments" boolean DEFAULT false,
  	"features_sponsorship" boolean DEFAULT false,
  	"features_donor_portal" boolean DEFAULT false,
  	"features_recurring" boolean DEFAULT false,
  	"features_international" boolean DEFAULT false,
  	"features_campaigns" boolean DEFAULT false,
  	"features_student_portal" boolean DEFAULT false,
  	"features_alumni_portal" boolean DEFAULT false,
  	"features_facebook_feed" boolean DEFAULT false,
  	"features_search" boolean DEFAULT true,
  	"features_accounts" boolean DEFAULT true,
  	"features_dark_mode" boolean DEFAULT true,
  	"default_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"name" varchar NOT NULL,
  	"short_name" varchar,
  	"tagline" varchar,
  	"parent_line" varchar,
  	"default_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "navigation_primary_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"new_tab" boolean,
  	"feature" "enum_navigation_primary_children_feature"
  );
  
  CREATE TABLE "navigation_primary_children_locales" (
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_primary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"new_tab" boolean,
  	"feature" "enum_navigation_primary_feature"
  );
  
  CREATE TABLE "navigation_primary_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_utility" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"new_tab" boolean,
  	"feature" "enum_navigation_utility_feature"
  );
  
  CREATE TABLE "navigation_utility_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"new_tab" boolean,
  	"feature" "enum_navigation_footer_columns_links_feature"
  );
  
  CREATE TABLE "navigation_footer_columns_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "navigation_footer_columns_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_legal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"new_tab" boolean,
  	"feature" "enum_navigation_legal_feature"
  );
  
  CREATE TABLE "navigation_legal_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_href" varchar DEFAULT '/donate',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_locales" (
  	"cta_label" varchar DEFAULT 'দান করুন',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "impact_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"suffix" varchar
  );
  
  CREATE TABLE "impact_stats_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "impact_stats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "site_settings_phones" ADD CONSTRAINT "site_settings_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_phones_locales" ADD CONSTRAINT "site_settings_phones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_phones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_addresses" ADD CONSTRAINT "site_settings_addresses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_addresses_locales" ADD CONSTRAINT "site_settings_addresses_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_addresses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_other_websites" ADD CONSTRAINT "site_settings_other_websites_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_other_websites_locales" ADD CONSTRAINT "site_settings_other_websites_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_other_websites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_prospectus_id_media_id_fk" FOREIGN KEY ("prospectus_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_admission_qr_id_media_id_fk" FOREIGN KEY ("admission_qr_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_primary_children" ADD CONSTRAINT "navigation_primary_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_primary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_primary_children_locales" ADD CONSTRAINT "navigation_primary_children_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_primary_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_primary" ADD CONSTRAINT "navigation_primary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_primary_locales" ADD CONSTRAINT "navigation_primary_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_primary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_utility" ADD CONSTRAINT "navigation_utility_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_utility_locales" ADD CONSTRAINT "navigation_utility_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_utility"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns_links" ADD CONSTRAINT "navigation_footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns_links_locales" ADD CONSTRAINT "navigation_footer_columns_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_columns_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns" ADD CONSTRAINT "navigation_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_footer_columns_locales" ADD CONSTRAINT "navigation_footer_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_legal" ADD CONSTRAINT "navigation_legal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_legal_locales" ADD CONSTRAINT "navigation_legal_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_legal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_locales" ADD CONSTRAINT "navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_stats_stats" ADD CONSTRAINT "impact_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_stats_stats_locales" ADD CONSTRAINT "impact_stats_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_stats_stats"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_phones_order_idx" ON "site_settings_phones" USING btree ("_order");
  CREATE INDEX "site_settings_phones_parent_id_idx" ON "site_settings_phones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_phones_locales_locale_parent_id_unique" ON "site_settings_phones_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_addresses_order_idx" ON "site_settings_addresses" USING btree ("_order");
  CREATE INDEX "site_settings_addresses_parent_id_idx" ON "site_settings_addresses" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_addresses_locales_locale_parent_id_unique" ON "site_settings_addresses_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_social_order_idx" ON "site_settings_social" USING btree ("_order");
  CREATE INDEX "site_settings_social_parent_id_idx" ON "site_settings_social" USING btree ("_parent_id");
  CREATE INDEX "site_settings_other_websites_order_idx" ON "site_settings_other_websites" USING btree ("_order");
  CREATE INDEX "site_settings_other_websites_parent_id_idx" ON "site_settings_other_websites" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_other_websites_locales_locale_parent_id_unique" ON "site_settings_other_websites_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_prospectus_idx" ON "site_settings" USING btree ("prospectus_id");
  CREATE INDEX "site_settings_admission_qr_idx" ON "site_settings" USING btree ("admission_qr_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_primary_children_order_idx" ON "navigation_primary_children" USING btree ("_order");
  CREATE INDEX "navigation_primary_children_parent_id_idx" ON "navigation_primary_children" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_primary_children_locales_locale_parent_id_unique" ON "navigation_primary_children_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_primary_order_idx" ON "navigation_primary" USING btree ("_order");
  CREATE INDEX "navigation_primary_parent_id_idx" ON "navigation_primary" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_primary_locales_locale_parent_id_unique" ON "navigation_primary_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_utility_order_idx" ON "navigation_utility" USING btree ("_order");
  CREATE INDEX "navigation_utility_parent_id_idx" ON "navigation_utility" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_utility_locales_locale_parent_id_unique" ON "navigation_utility_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_footer_columns_links_order_idx" ON "navigation_footer_columns_links" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_links_parent_id_idx" ON "navigation_footer_columns_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_footer_columns_links_locales_locale_parent_id_uni" ON "navigation_footer_columns_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_footer_columns_order_idx" ON "navigation_footer_columns" USING btree ("_order");
  CREATE INDEX "navigation_footer_columns_parent_id_idx" ON "navigation_footer_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_footer_columns_locales_locale_parent_id_unique" ON "navigation_footer_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_legal_order_idx" ON "navigation_legal" USING btree ("_order");
  CREATE INDEX "navigation_legal_parent_id_idx" ON "navigation_legal" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_legal_locales_locale_parent_id_unique" ON "navigation_legal_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "navigation_locales_locale_parent_id_unique" ON "navigation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impact_stats_stats_order_idx" ON "impact_stats_stats" USING btree ("_order");
  CREATE INDEX "impact_stats_stats_parent_id_idx" ON "impact_stats_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "impact_stats_stats_locales_locale_parent_id_unique" ON "impact_stats_stats_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_settings_phones" CASCADE;
  DROP TABLE "site_settings_phones_locales" CASCADE;
  DROP TABLE "site_settings_addresses" CASCADE;
  DROP TABLE "site_settings_addresses_locales" CASCADE;
  DROP TABLE "site_settings_social" CASCADE;
  DROP TABLE "site_settings_other_websites" CASCADE;
  DROP TABLE "site_settings_other_websites_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "navigation_primary_children" CASCADE;
  DROP TABLE "navigation_primary_children_locales" CASCADE;
  DROP TABLE "navigation_primary" CASCADE;
  DROP TABLE "navigation_primary_locales" CASCADE;
  DROP TABLE "navigation_utility" CASCADE;
  DROP TABLE "navigation_utility_locales" CASCADE;
  DROP TABLE "navigation_footer_columns_links" CASCADE;
  DROP TABLE "navigation_footer_columns_links_locales" CASCADE;
  DROP TABLE "navigation_footer_columns" CASCADE;
  DROP TABLE "navigation_footer_columns_locales" CASCADE;
  DROP TABLE "navigation_legal" CASCADE;
  DROP TABLE "navigation_legal_locales" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "navigation_locales" CASCADE;
  DROP TABLE "impact_stats_stats" CASCADE;
  DROP TABLE "impact_stats_stats_locales" CASCADE;
  DROP TABLE "impact_stats" CASCADE;
  DROP TYPE "public"."enum_site_settings_social_platform";
  DROP TYPE "public"."enum_navigation_primary_children_feature";
  DROP TYPE "public"."enum_navigation_primary_feature";
  DROP TYPE "public"."enum_navigation_utility_feature";
  DROP TYPE "public"."enum_navigation_footer_columns_links_feature";
  DROP TYPE "public"."enum_navigation_legal_feature";`)
}
