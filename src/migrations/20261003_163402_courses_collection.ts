import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_courses_type" AS ENUM('long', 'short');
  CREATE TYPE "public"."enum_courses_listing_status" AS ENUM('active', 'draft');
  CREATE TYPE "public"."enum_courses_format_residential" AS ENUM('residential', 'nonResidential', 'both');
  CREATE TYPE "public"."enum_courses_format_gender" AS ENUM('male', 'female', 'all');
  CREATE TYPE "public"."enum_courses_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__courses_v_version_type" AS ENUM('long', 'short');
  CREATE TYPE "public"."enum__courses_v_version_listing_status" AS ENUM('active', 'draft');
  CREATE TYPE "public"."enum__courses_v_version_format_residential" AS ENUM('residential', 'nonResidential', 'both');
  CREATE TYPE "public"."enum__courses_v_version_format_gender" AS ENUM('male', 'female', 'all');
  CREATE TYPE "public"."enum__courses_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__courses_v_published_locale" AS ENUM('bn', 'en');
  CREATE TABLE "courses_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "courses_objectives_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "courses_format_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "courses_format_bullets_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "courses_eligibility" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "courses_eligibility_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "courses_specialisations_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"arabic_name" varchar
  );
  
  CREATE TABLE "courses_specialisations_items_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "courses_semesters_rows_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "courses_semesters_rows_modules_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "courses_semesters_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"credits" numeric,
  	"hours" numeric,
  	"marks" numeric
  );
  
  CREATE TABLE "courses_semesters_rows_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "courses_semesters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source_total_credits" numeric,
  	"source_total_marks" numeric,
  	"source_total_hours" numeric
  );
  
  CREATE TABLE "courses_semesters_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"duration_label" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "courses_sdp_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hours" numeric
  );
  
  CREATE TABLE "courses_sdp_rows_locales" (
  	"title" varchar,
  	"objective" varchar,
  	"activities" varchar,
  	"outcome" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "courses_topics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "courses_topics_items_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "courses_outcomes_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "courses_outcomes_items_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"short_title" varchar,
  	"arabic_title" varchar,
  	"type" "enum_courses_type",
  	"listing_status" "enum_courses_listing_status" DEFAULT 'active',
  	"order" numeric DEFAULT 0,
  	"format_residential" "enum_courses_format_residential" DEFAULT 'both',
  	"format_gender" "enum_courses_format_gender",
  	"featured" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_courses_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "courses_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"intro" varchar,
  	"format_duration_label" varchar,
  	"specialisations_lead" varchar,
  	"sdp_note" varchar,
  	"topics_label" varchar,
  	"outcomes_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_courses_v_version_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_objectives_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_courses_v_version_format_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_format_bullets_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_courses_v_version_eligibility" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_eligibility_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_courses_v_version_specialisations_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"arabic_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_specialisations_items_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_courses_v_version_semesters_rows_modules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_semesters_rows_modules_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_courses_v_version_semesters_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"credits" numeric,
  	"hours" numeric,
  	"marks" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_semesters_rows_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_courses_v_version_semesters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source_total_credits" numeric,
  	"source_total_marks" numeric,
  	"source_total_hours" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_semesters_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"duration_label" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_courses_v_version_sdp_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hours" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_sdp_rows_locales" (
  	"title" varchar,
  	"objective" varchar,
  	"activities" varchar,
  	"outcome" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_courses_v_version_topics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_topics_items_locales" (
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_courses_v_version_outcomes_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_outcomes_items_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_courses_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_short_title" varchar,
  	"version_arabic_title" varchar,
  	"version_type" "enum__courses_v_version_type",
  	"version_listing_status" "enum__courses_v_version_listing_status" DEFAULT 'active',
  	"version_order" numeric DEFAULT 0,
  	"version_format_residential" "enum__courses_v_version_format_residential" DEFAULT 'both',
  	"version_format_gender" "enum__courses_v_version_format_gender",
  	"version_featured" boolean DEFAULT false,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__courses_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__courses_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_courses_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_intro" varchar,
  	"version_format_duration_label" varchar,
  	"version_specialisations_lead" varchar,
  	"version_sdp_note" varchar,
  	"version_topics_label" varchar,
  	"version_outcomes_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "courses_id" integer;
  ALTER TABLE "courses_objectives" ADD CONSTRAINT "courses_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_objectives_locales" ADD CONSTRAINT "courses_objectives_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_objectives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_format_bullets" ADD CONSTRAINT "courses_format_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_format_bullets_locales" ADD CONSTRAINT "courses_format_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_format_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_eligibility" ADD CONSTRAINT "courses_eligibility_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_eligibility_locales" ADD CONSTRAINT "courses_eligibility_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_eligibility"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_specialisations_items" ADD CONSTRAINT "courses_specialisations_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_specialisations_items_locales" ADD CONSTRAINT "courses_specialisations_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_specialisations_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_semesters_rows_modules" ADD CONSTRAINT "courses_semesters_rows_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_semesters_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_semesters_rows_modules_locales" ADD CONSTRAINT "courses_semesters_rows_modules_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_semesters_rows_modules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_semesters_rows" ADD CONSTRAINT "courses_semesters_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_semesters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_semesters_rows_locales" ADD CONSTRAINT "courses_semesters_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_semesters_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_semesters" ADD CONSTRAINT "courses_semesters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_semesters_locales" ADD CONSTRAINT "courses_semesters_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_semesters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_sdp_rows" ADD CONSTRAINT "courses_sdp_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_sdp_rows_locales" ADD CONSTRAINT "courses_sdp_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_sdp_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_topics_items" ADD CONSTRAINT "courses_topics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_topics_items_locales" ADD CONSTRAINT "courses_topics_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_topics_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_outcomes_items" ADD CONSTRAINT "courses_outcomes_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_outcomes_items_locales" ADD CONSTRAINT "courses_outcomes_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_outcomes_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_locales" ADD CONSTRAINT "courses_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_objectives" ADD CONSTRAINT "_courses_v_version_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_objectives_locales" ADD CONSTRAINT "_courses_v_version_objectives_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_objectives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_format_bullets" ADD CONSTRAINT "_courses_v_version_format_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_format_bullets_locales" ADD CONSTRAINT "_courses_v_version_format_bullets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_format_bullets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_eligibility" ADD CONSTRAINT "_courses_v_version_eligibility_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_eligibility_locales" ADD CONSTRAINT "_courses_v_version_eligibility_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_eligibility"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_specialisations_items" ADD CONSTRAINT "_courses_v_version_specialisations_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_specialisations_items_locales" ADD CONSTRAINT "_courses_v_version_specialisations_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_specialisations_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_semesters_rows_modules" ADD CONSTRAINT "_courses_v_version_semesters_rows_modules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_semesters_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_semesters_rows_modules_locales" ADD CONSTRAINT "_courses_v_version_semesters_rows_modules_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_semesters_rows_modules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_semesters_rows" ADD CONSTRAINT "_courses_v_version_semesters_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_semesters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_semesters_rows_locales" ADD CONSTRAINT "_courses_v_version_semesters_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_semesters_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_semesters" ADD CONSTRAINT "_courses_v_version_semesters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_semesters_locales" ADD CONSTRAINT "_courses_v_version_semesters_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_semesters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_sdp_rows" ADD CONSTRAINT "_courses_v_version_sdp_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_sdp_rows_locales" ADD CONSTRAINT "_courses_v_version_sdp_rows_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_sdp_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_topics_items" ADD CONSTRAINT "_courses_v_version_topics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_topics_items_locales" ADD CONSTRAINT "_courses_v_version_topics_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_topics_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_outcomes_items" ADD CONSTRAINT "_courses_v_version_outcomes_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_outcomes_items_locales" ADD CONSTRAINT "_courses_v_version_outcomes_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_outcomes_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_parent_id_courses_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_locales" ADD CONSTRAINT "_courses_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "courses_objectives_order_idx" ON "courses_objectives" USING btree ("_order");
  CREATE INDEX "courses_objectives_parent_id_idx" ON "courses_objectives" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "courses_objectives_locales_locale_parent_id_unique" ON "courses_objectives_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "courses_format_bullets_order_idx" ON "courses_format_bullets" USING btree ("_order");
  CREATE INDEX "courses_format_bullets_parent_id_idx" ON "courses_format_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "courses_format_bullets_locales_locale_parent_id_unique" ON "courses_format_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "courses_eligibility_order_idx" ON "courses_eligibility" USING btree ("_order");
  CREATE INDEX "courses_eligibility_parent_id_idx" ON "courses_eligibility" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "courses_eligibility_locales_locale_parent_id_unique" ON "courses_eligibility_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "courses_specialisations_items_order_idx" ON "courses_specialisations_items" USING btree ("_order");
  CREATE INDEX "courses_specialisations_items_parent_id_idx" ON "courses_specialisations_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "courses_specialisations_items_locales_locale_parent_id_uniqu" ON "courses_specialisations_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "courses_semesters_rows_modules_order_idx" ON "courses_semesters_rows_modules" USING btree ("_order");
  CREATE INDEX "courses_semesters_rows_modules_parent_id_idx" ON "courses_semesters_rows_modules" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "courses_semesters_rows_modules_locales_locale_parent_id_uniq" ON "courses_semesters_rows_modules_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "courses_semesters_rows_order_idx" ON "courses_semesters_rows" USING btree ("_order");
  CREATE INDEX "courses_semesters_rows_parent_id_idx" ON "courses_semesters_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "courses_semesters_rows_locales_locale_parent_id_unique" ON "courses_semesters_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "courses_semesters_order_idx" ON "courses_semesters" USING btree ("_order");
  CREATE INDEX "courses_semesters_parent_id_idx" ON "courses_semesters" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "courses_semesters_locales_locale_parent_id_unique" ON "courses_semesters_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "courses_sdp_rows_order_idx" ON "courses_sdp_rows" USING btree ("_order");
  CREATE INDEX "courses_sdp_rows_parent_id_idx" ON "courses_sdp_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "courses_sdp_rows_locales_locale_parent_id_unique" ON "courses_sdp_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "courses_topics_items_order_idx" ON "courses_topics_items" USING btree ("_order");
  CREATE INDEX "courses_topics_items_parent_id_idx" ON "courses_topics_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "courses_topics_items_locales_locale_parent_id_unique" ON "courses_topics_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "courses_outcomes_items_order_idx" ON "courses_outcomes_items" USING btree ("_order");
  CREATE INDEX "courses_outcomes_items_parent_id_idx" ON "courses_outcomes_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "courses_outcomes_items_locales_locale_parent_id_unique" ON "courses_outcomes_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");
  CREATE INDEX "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE INDEX "courses__status_idx" ON "courses" USING btree ("_status");
  CREATE UNIQUE INDEX "courses_locales_locale_parent_id_unique" ON "courses_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_courses_v_version_objectives_order_idx" ON "_courses_v_version_objectives" USING btree ("_order");
  CREATE INDEX "_courses_v_version_objectives_parent_id_idx" ON "_courses_v_version_objectives" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_courses_v_version_objectives_locales_locale_parent_id_uniqu" ON "_courses_v_version_objectives_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_courses_v_version_format_bullets_order_idx" ON "_courses_v_version_format_bullets" USING btree ("_order");
  CREATE INDEX "_courses_v_version_format_bullets_parent_id_idx" ON "_courses_v_version_format_bullets" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_courses_v_version_format_bullets_locales_locale_parent_id_u" ON "_courses_v_version_format_bullets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_courses_v_version_eligibility_order_idx" ON "_courses_v_version_eligibility" USING btree ("_order");
  CREATE INDEX "_courses_v_version_eligibility_parent_id_idx" ON "_courses_v_version_eligibility" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_courses_v_version_eligibility_locales_locale_parent_id_uniq" ON "_courses_v_version_eligibility_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_courses_v_version_specialisations_items_order_idx" ON "_courses_v_version_specialisations_items" USING btree ("_order");
  CREATE INDEX "_courses_v_version_specialisations_items_parent_id_idx" ON "_courses_v_version_specialisations_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_courses_v_version_specialisations_items_locales_locale_pare" ON "_courses_v_version_specialisations_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_courses_v_version_semesters_rows_modules_order_idx" ON "_courses_v_version_semesters_rows_modules" USING btree ("_order");
  CREATE INDEX "_courses_v_version_semesters_rows_modules_parent_id_idx" ON "_courses_v_version_semesters_rows_modules" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_courses_v_version_semesters_rows_modules_locales_locale_par" ON "_courses_v_version_semesters_rows_modules_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_courses_v_version_semesters_rows_order_idx" ON "_courses_v_version_semesters_rows" USING btree ("_order");
  CREATE INDEX "_courses_v_version_semesters_rows_parent_id_idx" ON "_courses_v_version_semesters_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_courses_v_version_semesters_rows_locales_locale_parent_id_u" ON "_courses_v_version_semesters_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_courses_v_version_semesters_order_idx" ON "_courses_v_version_semesters" USING btree ("_order");
  CREATE INDEX "_courses_v_version_semesters_parent_id_idx" ON "_courses_v_version_semesters" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_courses_v_version_semesters_locales_locale_parent_id_unique" ON "_courses_v_version_semesters_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_courses_v_version_sdp_rows_order_idx" ON "_courses_v_version_sdp_rows" USING btree ("_order");
  CREATE INDEX "_courses_v_version_sdp_rows_parent_id_idx" ON "_courses_v_version_sdp_rows" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_courses_v_version_sdp_rows_locales_locale_parent_id_unique" ON "_courses_v_version_sdp_rows_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_courses_v_version_topics_items_order_idx" ON "_courses_v_version_topics_items" USING btree ("_order");
  CREATE INDEX "_courses_v_version_topics_items_parent_id_idx" ON "_courses_v_version_topics_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_courses_v_version_topics_items_locales_locale_parent_id_uni" ON "_courses_v_version_topics_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_courses_v_version_outcomes_items_order_idx" ON "_courses_v_version_outcomes_items" USING btree ("_order");
  CREATE INDEX "_courses_v_version_outcomes_items_parent_id_idx" ON "_courses_v_version_outcomes_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_courses_v_version_outcomes_items_locales_locale_parent_id_u" ON "_courses_v_version_outcomes_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_courses_v_parent_idx" ON "_courses_v" USING btree ("parent_id");
  CREATE INDEX "_courses_v_version_version_slug_idx" ON "_courses_v" USING btree ("version_slug");
  CREATE INDEX "_courses_v_version_version_updated_at_idx" ON "_courses_v" USING btree ("version_updated_at");
  CREATE INDEX "_courses_v_version_version_created_at_idx" ON "_courses_v" USING btree ("version_created_at");
  CREATE INDEX "_courses_v_version_version__status_idx" ON "_courses_v" USING btree ("version__status");
  CREATE INDEX "_courses_v_created_at_idx" ON "_courses_v" USING btree ("created_at");
  CREATE INDEX "_courses_v_updated_at_idx" ON "_courses_v" USING btree ("updated_at");
  CREATE INDEX "_courses_v_snapshot_idx" ON "_courses_v" USING btree ("snapshot");
  CREATE INDEX "_courses_v_published_locale_idx" ON "_courses_v" USING btree ("published_locale");
  CREATE INDEX "_courses_v_latest_idx" ON "_courses_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_courses_v_locales_locale_parent_id_unique" ON "_courses_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "courses_objectives" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_objectives_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_format_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_format_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_eligibility" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_eligibility_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_specialisations_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_specialisations_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_semesters_rows_modules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_semesters_rows_modules_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_semesters_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_semesters_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_semesters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_semesters_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_sdp_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_sdp_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_topics_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_topics_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_outcomes_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_outcomes_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_objectives" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_objectives_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_format_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_format_bullets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_eligibility" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_eligibility_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_specialisations_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_specialisations_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_semesters_rows_modules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_semesters_rows_modules_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_semesters_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_semesters_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_semesters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_semesters_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_sdp_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_sdp_rows_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_topics_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_topics_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_outcomes_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_outcomes_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "courses_objectives" CASCADE;
  DROP TABLE "courses_objectives_locales" CASCADE;
  DROP TABLE "courses_format_bullets" CASCADE;
  DROP TABLE "courses_format_bullets_locales" CASCADE;
  DROP TABLE "courses_eligibility" CASCADE;
  DROP TABLE "courses_eligibility_locales" CASCADE;
  DROP TABLE "courses_specialisations_items" CASCADE;
  DROP TABLE "courses_specialisations_items_locales" CASCADE;
  DROP TABLE "courses_semesters_rows_modules" CASCADE;
  DROP TABLE "courses_semesters_rows_modules_locales" CASCADE;
  DROP TABLE "courses_semesters_rows" CASCADE;
  DROP TABLE "courses_semesters_rows_locales" CASCADE;
  DROP TABLE "courses_semesters" CASCADE;
  DROP TABLE "courses_semesters_locales" CASCADE;
  DROP TABLE "courses_sdp_rows" CASCADE;
  DROP TABLE "courses_sdp_rows_locales" CASCADE;
  DROP TABLE "courses_topics_items" CASCADE;
  DROP TABLE "courses_topics_items_locales" CASCADE;
  DROP TABLE "courses_outcomes_items" CASCADE;
  DROP TABLE "courses_outcomes_items_locales" CASCADE;
  DROP TABLE "courses" CASCADE;
  DROP TABLE "courses_locales" CASCADE;
  DROP TABLE "_courses_v_version_objectives" CASCADE;
  DROP TABLE "_courses_v_version_objectives_locales" CASCADE;
  DROP TABLE "_courses_v_version_format_bullets" CASCADE;
  DROP TABLE "_courses_v_version_format_bullets_locales" CASCADE;
  DROP TABLE "_courses_v_version_eligibility" CASCADE;
  DROP TABLE "_courses_v_version_eligibility_locales" CASCADE;
  DROP TABLE "_courses_v_version_specialisations_items" CASCADE;
  DROP TABLE "_courses_v_version_specialisations_items_locales" CASCADE;
  DROP TABLE "_courses_v_version_semesters_rows_modules" CASCADE;
  DROP TABLE "_courses_v_version_semesters_rows_modules_locales" CASCADE;
  DROP TABLE "_courses_v_version_semesters_rows" CASCADE;
  DROP TABLE "_courses_v_version_semesters_rows_locales" CASCADE;
  DROP TABLE "_courses_v_version_semesters" CASCADE;
  DROP TABLE "_courses_v_version_semesters_locales" CASCADE;
  DROP TABLE "_courses_v_version_sdp_rows" CASCADE;
  DROP TABLE "_courses_v_version_sdp_rows_locales" CASCADE;
  DROP TABLE "_courses_v_version_topics_items" CASCADE;
  DROP TABLE "_courses_v_version_topics_items_locales" CASCADE;
  DROP TABLE "_courses_v_version_outcomes_items" CASCADE;
  DROP TABLE "_courses_v_version_outcomes_items_locales" CASCADE;
  DROP TABLE "_courses_v" CASCADE;
  DROP TABLE "_courses_v_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_courses_fk";
  
  DROP INDEX "payload_locked_documents_rels_courses_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "courses_id";
  DROP TYPE "public"."enum_courses_type";
  DROP TYPE "public"."enum_courses_listing_status";
  DROP TYPE "public"."enum_courses_format_residential";
  DROP TYPE "public"."enum_courses_format_gender";
  DROP TYPE "public"."enum_courses_status";
  DROP TYPE "public"."enum__courses_v_version_type";
  DROP TYPE "public"."enum__courses_v_version_listing_status";
  DROP TYPE "public"."enum__courses_v_version_format_residential";
  DROP TYPE "public"."enum__courses_v_version_format_gender";
  DROP TYPE "public"."enum__courses_v_version_status";
  DROP TYPE "public"."enum__courses_v_published_locale";`)
}
